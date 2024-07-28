const Product = require('../models/Product');
const fetch = require('node-fetch');

// [GET] api/product
const read = async (req, res, next) => {
    try {
        const products = await Product.find().populate('type').populate('ratings');
        return res.status(200).json({ success: true, products });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [POST] api/product
const create = async (req, res, next) => {
    const { name, nameEN, description, descriptionEN, importPrice, price, type, images, status, discount } = req.body;
    // Validate field
    if (!name || !nameEN || !description || !descriptionEN || !importPrice || !price || !type || !images) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed field' });
    }

    try {
        const newProduct = new Product({
            name,
            nameEN,
            description,
            descriptionEN,
            importPrice,
            price,
            priceDiscounted,
            type,
            images,
            status,
            discount,
        });
        await newProduct.save();

        return res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/product/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ id })
            .populate('type')
            .populate({
                path: 'ratings',
                populate: {
                    path: 'customer',
                },
            });
        return res.status(200).json({ success: true, product });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [PUT] api/product/:id
const update = async (req, res, next) => {
    const id = Number(req.params.id);
    const bodyObj = req.body;
    const updateObj = {};

    Object.keys(bodyObj).forEach((key) => {
        if (bodyObj[key] !== undefined) {
            updateObj[key] = bodyObj[key];
        }
    });

    // Update product
    try {
        const newProduct = await Product.findOneAndUpdate({ id }, updateObj, {
            new: true,
        });
        return res.status(200).json({ success: true, product: newProduct });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [DELETE] api/product/:id
const destroy = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed id' });
    }

    try {
        await Product.delete({ id: req.params.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/product/search?q=:searchString
const search = async (req, res, next) => {
    const searchString = req.query.q;
    try {
        const body = JSON.stringify({
            query: {
                multi_match: {
                    query: searchString,
                    analyzer: 'my_vi_analyzer',
                    fields: ['name', 'description', 'type'],
                },
            },
            highlight: {
                fields: {
                    name: {
                        fragment_size: 100,
                        number_of_fragments: 4,
                    },
                    nameEN: {
                        fragment_size: 100,
                        number_of_fragments: 4,
                    },
                    description: {
                        fragment_size: 250,
                        number_of_fragments: 5,
                    },
                    descriptionEN: {
                        fragment_size: 250,
                        number_of_fragments: 5,
                    },
                    type: {
                        fragment_size: 50,
                        number_of_fragments: 3,
                    },
                },
            },
            sort: { _score: { order: 'desc' } },
        });
        const elasticRes = await fetch('http://elastic:changeme@localhost:9200/product/_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });

        const elasticData = await elasticRes.json();
        const products = elasticData.hits.hits.map((hit) => ({
            id: hit._source.id,
            name: hit.highlight.name?.[0] ?? hit._source.name,
            nameEN: hit.highlight.nameEN?.[0] ?? hit._source.nameEN,
            description: hit.highlight.description?.[0] ?? hit._source.description,
            descriptionEN: hit.highlight.descriptionEN?.[0] ?? hit._source.descriptionEN,
            type: hit.highlight.type?.[0] ?? hit._source.type,
            price: hit._source.price,
            images: hit._source.images,
        }));
        return res.status(200).json({ success: true, products });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

function removeVietnameseTones(stra) {
    var str = stra;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    return str;
}
//     [GET] api/product/search
const searchSimple = async (req, res, next) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ success: false, status: 400, message: 'Missing name query' });
    }

    const normalizedQuery = removeVietnameseTones(name.toLowerCase());

    try {
        const products = await Product.find();
        const filteredProducts = products.filter((product) => removeVietnameseTones(product.name.toLowerCase()).includes(normalizedQuery));

        return res.status(200).json({ success: true, products: filteredProducts });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, create, readOne, update, destroy, search, searchSimple };
