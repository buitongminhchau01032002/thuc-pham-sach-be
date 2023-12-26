const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const CouponSchema = new Schema(
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
        discountPercent: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isOneTime: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

CouponSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
CouponSchema.plugin(AutoIncrement, { id: 'coupons', inc_field: 'id' });

module.exports = mongoose.model('coupons', CouponSchema);
