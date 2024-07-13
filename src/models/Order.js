const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

// Subschemas for province, district, and commune
const ProvinceSchema = new Schema(
    {
        Id: {
            type: Number,
            required: true,
        },
        Code: {
            type: String,
            required: true,
        },
        Name: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const DistrictSchema = new Schema(
    {
        Id: {
            type: Number,
            required: true,
        },
        Code: {
            type: String,
            required: true,
        },
        Name: {
            type: String,
            required: true,
        },
        ProvinceId: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const CommuneSchema = new Schema(
    {
        Id: {
            type: Number,
            required: true,
        },
        Code: {
            type: String,
            required: true,
        },
        Name: {
            type: String,
            required: true,
        },
        DistrictId: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

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
        coupon: {
            type: Schema.Types.ObjectId,
            ref: 'coupons',
            require: false,
        },
        vouchers: {
            type: Array,
            default: [],
        },
        totalPrice: {
            type: Number,
        },
        intoMoney: {
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
        paymentMethod: {
            type: String,
        },
        phone: {
            type: String,
        },
        province: {
            type: ProvinceSchema,
        },
        district: {
            type: DistrictSchema,
        },
        commune: {
            type: CommuneSchema,
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
