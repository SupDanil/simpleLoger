const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    date: {type: String, required: true},
    logs: [{type: {message: String, time: String}, required: true}],
});

module.exports = model('Logs', schema);
