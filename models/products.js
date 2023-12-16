const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    imgLink: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productScheme);
