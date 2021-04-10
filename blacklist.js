 const mongoose = require("mongoose");

const schema = mongoose.Schema({
    _id: { type: String, required: true },
    autorTag: String
})

module.exports = mongoose.model('blacklists', schema)