const mongoose = require("mongoose")
const enums = require("./enums")

const habitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    frequencyValue: {
        type: Number,
        required: true,
    },
    frequencyUnit: {
        type: String,
        enum: enums.FREQUENCY_UNITS,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal',
    },
})

module.exports = mongoose.model("Habit", habitSchema);