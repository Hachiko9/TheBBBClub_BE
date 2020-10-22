// models/User.model.js

const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
    {
        title: {type: String, required: true},
        userId: {type: String, required: true},
        body: {type: String, required: true},
        movieId: {type: String, required: true},
        overallScore: {type: Number, required: true}
    },
    {
        timestamps: true
    }
);

module.exports = model('Review', reviewSchema);