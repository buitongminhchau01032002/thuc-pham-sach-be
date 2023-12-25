const Account = require('../models/Account');
const argon2 = require('argon2');

// [POST] api/auth/login
const login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed field' });
    }

    try {
        let account;
        account = await Account.findOne({ username }).populate('role');
        if (!account) {
            return res
                .status(401)
                .json({ success: false, status: 401, message: 'username incorrect' });
        }

        if (!(await argon2.verify(account.password, password))) {
            return res
                .status(401)
                .json({ success: false, status: 401, message: 'password incorrect' });
        }

        return res.status(200).json({ success: true, account });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { login };
