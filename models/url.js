const mongoose = require("mongoose");

const urlschema = new mongoose.Schema({
    shortid: {
        type: String,
        required: true,
        unique: true,
    },
    redirectedurl: {
        type: String,
        required: true,
    },
    visithistory: [{
        timestamp: {
            type: Number
        }
    }],
}, { timestamps: true });

const URL = mongoose.model('url', urlschema);

module.exports = URL;
