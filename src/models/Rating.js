const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const RatingSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'customers',
        },
        score: {
            type: Number,
        },
        commnent: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

RatingSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
RatingSchema.plugin(AutoIncrement, { id: 'ratings', inc_field: 'id' });

module.exports = mongoose.model('ratings', RatingSchema);
