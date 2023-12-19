const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const DetailImportSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        import: {
            type: Schema.Types.ObjectId,
            ref: 'imports',
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
        },
        quantity: {
            type: Number,
            require: true,
            default: 1,
        },
        importPrice: {
            type: Number,
            require: true,
        },
        totalPrice: {
            type: Number,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

DetailImportSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
DetailImportSchema.plugin(AutoIncrement, { id: 'detail_imports', inc_field: 'id' });

module.exports = mongoose.model('detail_imports', DetailImportSchema);
