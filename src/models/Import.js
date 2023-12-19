const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const ImportSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        totalPrice: {
            type: Number,
        },
        note: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

ImportSchema.virtual('details', {
    ref: 'detail_imports',
    localField: '_id',
    foreignField: 'import',
});

ImportSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
ImportSchema.plugin(AutoIncrement, { id: 'imports', inc_field: 'id' });

module.exports = mongoose.model('imports', ImportSchema);
