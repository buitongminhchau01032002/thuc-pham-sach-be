const fetch = require('node-fetch');
const Product = require('../models/Product');

async function deleteIndex() {
    await fetch('http://elastic:changeme@localhost:9200/product', {
        method: 'DELETE',
    });
}

async function createNewIndex() {
    const body = JSON.stringify({
        settings: {
            analysis: {
                analyzer: {
                    my_vi_analyzer: {
                        tokenizer: 'vi_tokenizer',
                        filter: ['lowercase', 'ascii_folding'],
                    },
                },
                filter: {
                    ascii_folding: {
                        type: 'asciifolding',
                        preserve_original: true,
                    },
                },
            },
        },
        mappings: {
            properties: {
                name: {
                    type: 'text',
                    analyzer: 'my_vi_analyzer',
                },
                type: {
                    type: 'text',
                    analyzer: 'my_vi_analyzer',
                },
                description: {
                    type: 'text',
                    analyzer: 'my_vi_analyzer',
                },
            },
        },
    });
    await fetch('http://elastic:changeme@localhost:9200/product', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });
}

async function addDocument(document) {
    const body = JSON.stringify(document);
    await fetch('http://elastic:changeme@localhost:9200/product/_doc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });
}

async function addDocuments() {
    const products = await Product.find().populate('type');
    products.forEach((product) => {
        addDocument({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            type: product.type.name,
            images: product.images,
        });
    });
}

async function elasticsearchConfig() {
    try {
        await deleteIndex();
        await createNewIndex();
        await addDocuments();
        console.log('Elasticsearch connected');
    } catch (err) {
        console.log('Config Elasticsearch error');
        console.log(err);
    }
}

module.exports = elasticsearchConfig;
