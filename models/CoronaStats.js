const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statsSchema = new Schema({
    country: String,
    numberInfected: {
        type: Number,
        required: true
    }
});

const CoronaStats = mongoose.model('CoronaStats', statsSchema);

module.exports = CoronaStats;