// models/User.model.js

const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
    {
        author: {type: String, required: true},
        content: {type: String, required: true},
        movieId: {type: String, required: true},
        score: {type: Number, required: true}
    },
    {
        timestamps: true
    }
);

module.exports = model('Review', reviewSchema);