const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const CustomerVoucherSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        customerId: {
            type: Number,
            required: true,
        },
        voucherId: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

CustomerVoucherSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
CustomerVoucherSchema.plugin(AutoIncrement, { id: 'customer_vouchers', inc_field: 'id' });

module.exports = mongoose.model('customer_vouchers', CustomerVoucherSchema);
