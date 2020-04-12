const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statsSchema = new Schema({
    user: String,
    text: {
        type: String,
        required: true
    }

})

const CoronaStats = mongoose.model('CoronaStats', statsSchema);

module.exports = CoronaStats;