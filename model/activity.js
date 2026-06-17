const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    activity: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;