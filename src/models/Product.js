const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        importPrice: {
            type: Number,
        },
        price: {
            type: Number,
        },
        type: {
            type: Schema.Types.ObjectId,
            ref: 'product_types',
        },
        images: [
            {
                type: String,
            },
        ],
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        quantity: {
            type: Number,
            default: 100,
        },
        saledQuantity: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

ProductSchema.virtual('ratings', {
    ref: 'ratings',
    localField: '_id',
    foreignField: 'product',
});

ProductSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
ProductSchema.plugin(AutoIncrement, { id: 'products', inc_field: 'id' });

module.exports = mongoose.model('products', ProductSchema);
