const mongoose = require('mongoose');
const prefixSchema = new mongoose.Schema({
    GuildID: String,
    prefix: {
    type: String,
    default: 's!',
    required: true
    }
});

const MessageModel = module.exports = mongoose.model('GuildPrefix', prefixSchema);