const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    message: {type: String, required: true},
    time: {type: String, required: true},
    date: {type: Types.ObjectId, ref: 'Logs'}
});

module.exports = model('LogItem', schema);
