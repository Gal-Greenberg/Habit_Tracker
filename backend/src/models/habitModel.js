const mongoose = require("mongoose")
const idValidator = require('mongoose-id-validator')

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
        enum: ["minutes", "hours", "days", "weeks"],
        required: true,
    },
    progress: {
        type: Number,
        default: 0,
    },
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goals',
    },
})

habitSchema.plugin(idValidator);

module.exports = mongoose.model("Habit", habitSchema);