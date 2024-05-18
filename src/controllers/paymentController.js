const fetch = require('node-fetch');
const moment = require('moment');
const { nanoid } = require('nanoid');
const CryptoJS = require('crypto-js');

// [POST] api/payment/create-trans
const createTrans = async (req, res, next) => {
    const { method, amount } = req.body;

    if (!method || !amount || amount <= 0) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed field' });
    }

    try {
        const app_id = Number(process.env.APP_ID);
        const app_user = 'fresh_food';
        const app_trans_id = `${moment().format('YYMMDD')}_${nanoid()}`;
        const app_time = Date.now();
        const item = '[]';

        const embed_data = JSON.stringify({
            redirecturl: 'http://localhost:5173/cart',
        });
        const body = {
            app_id,
            app_user,
            app_trans_id,
            app_time,
            amount,
            item,
            embed_data,
            description: `Thanh toán trên Fresh Food`,
        };

        const data = [app_id, app_trans_id, app_user, amount, app_time, embed_data, item].join('|');
        body.mac = CryptoJS.HmacSHA256(data, process.env.KEY1).toString();
        const transRes = await fetch('https://sb-openapi.zalopay.vn/v2/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const transData = await transRes.json();

        if (transData.return_code === 1) {
            return res.status(200).json({
                success: true,
                trans: { orderUrl: transData.order_url, transId: app_trans_id },
            });
        } else {
            console.log(transData);
            console.log(body);
            return res
                .status(500)
                .json({ success: false, status: 500, message: 'Internal server error' });
        }
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/payment/get-trans-status/:id
const getTransStatus = async (req, res, next) => {
    const app_trans_id = req.params.id;
    const app_id = Number(process.env.APP_ID);

    try {
        const body = {
            app_id,
            app_trans_id,
        };

        const data = [app_id, app_trans_id, process.env.KEY1].join('|');
        body.mac = CryptoJS.HmacSHA256(data, process.env.KEY1).toString();
        const queryRes = await fetch('https://sb-openapi.zalopay.vn/v2/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const queryData = await queryRes.json();

        return res.status(200).json({
            success: true,
            returnCode: queryData.return_code,
        });
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { createTrans, getTransStatus };
