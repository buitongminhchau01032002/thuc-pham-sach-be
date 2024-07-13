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

const CustomerSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        province: {
            type: ProvinceSchema,
            required: true,
        },
        district: {
            type: DistrictSchema,
            required: true,
        },
        commune: {
            type: CommuneSchema,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        listFavorite: [
            {
                type: Schema.Types.ObjectId,
                ref: 'products',
            },
        ],
    },
    {
        timestamps: true,
    }
);

CustomerSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
CustomerSchema.plugin(AutoIncrement, { id: 'customers', inc_field: 'id' });

module.exports = mongoose.model('customers', CustomerSchema);
