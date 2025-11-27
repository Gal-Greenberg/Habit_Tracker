const mongoose = require("mongoose");
const enums = require("./enums");

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    targetValue: {
        type: Number,
        required: true,
    },
    currentValue: {
        type: Number,
        default: 0,
    },
    targetDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: enums.GOAL_STATUS,
        default: "not started",
    },
    priority: {
        type: String,
        enums: enums.GOAL_PRIORITY,
        default: "medium",
    },
    // reminderDates: [{
    //     type: Date
    // }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

module.exports = mongoose.model("Goal", goalSchema);