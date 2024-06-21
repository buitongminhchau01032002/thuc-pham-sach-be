const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const VoucherSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        limit: {
            type: Number,
            required: true,
        },
        start: {
            type: Date,
            require: true,
        },
        end: {
            type: Date,
            require: true,
        },
        discount: {
            type: {
                type: String,
                enum: ['percent', 'amount'],
                required: true,
            },
            value: {
                type: Number,
                required: true,
            },
        },
        discountTargets: {
            type: Array,
            default: null,
            required: false,
        },
        description: {
            type: String,
            required: true,
        },
        orderCondition: {
            targets: {
                type: Array,
                default: null,
                required: false,
            },
            condition: {
                type: {
                    type: String,
                    enum: ['quantity', 'amount'],
                    required: true,
                },
                value: {
                    type: Number,
                    required: true,
                },
            },
        },
    },
    {
        timestamps: true,
    }
);

VoucherSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
VoucherSchema.plugin(AutoIncrement, { id: 'vouchers', inc_field: 'id' });

module.exports = mongoose.model('vouchers', VoucherSchema);
