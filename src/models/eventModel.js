const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
            trim: true,
        },
        malePrice: {
            type: Number,
            required: true,
        },
        femalePrice: {
            type: Number,
            required: true,
        },
        twoPeoplePrice: {
            type: Number,
            required: true,
        },
        dateofEvent: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        locationLink: {
            type: String,
            required: true,
            trim: true,
        },
        fromTime: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        },

        toTime: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        },

        registrationCount: {
            type: Number,
            required: true,
        },
        deadline: {
            type: Date,
            required: true
        },
        active:{
            type:Boolean,
            required:true,
            default:false
        }
    },
    {
        timestamps: true,
    },
);

const eventModel = mongoose.model("Event", eventSchema);

module.exports = eventModel;
