const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'customers',
            require: false,
        },
        totalPrice: {
            type: Number,
        },
        receivedMoney: {
            type: Number,
        },
        exchangeMoney: {
            type: Number,
        },
        deliveryStatus: {
            type: String,
            enum: ['pending', 'delivered', 'aborted'],
        },
        paymentStatus: {
            type: String,
            enum: ['unpaid', 'paid'],
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

OrderSchema.virtual('details', {
    ref: 'detail_orders',
    localField: '_id',
    foreignField: 'order',
});

OrderSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
OrderSchema.plugin(AutoIncrement, { id: 'orders', inc_field: 'id' });

module.exports = mongoose.model('orders', OrderSchema);
