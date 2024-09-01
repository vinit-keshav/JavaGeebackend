const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    className: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const CodeModel = mongoose.model('Code', codeSchema);

module.exports = CodeModel;

