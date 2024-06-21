const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const PromotionProgramSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        vouchers: {
            type: Array,
            default: [],
        },
        trigger: {
            type: String,
            enum: ['register', 'buy', 'at_time', 'manual'],
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
                },
                value: {
                    type: Number,
                },
            },
        },
    },
    {
        timestamps: true,
    }
);

PromotionProgramSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
PromotionProgramSchema.plugin(AutoIncrement, { id: 'promotion_programs', inc_field: 'id' });

module.exports = mongoose.model('promotion_programs', PromotionProgramSchema);
