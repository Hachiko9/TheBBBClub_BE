const { Router } = require("express");
const router = new Router();
const Review = require("../models/review.model");

// get reviews by movie
router.get("movies/:movieId/reviews", (req, res) => {
    const { movieId } = req.params;

    Review.find({movieId})
        .then(reviews => res.status(200).json({reviews}))
        .catch(err => res.status(500).json({errorMessage: err}))
})

// get reviews by user
router.get("user/:userId/reviews", (req, res) => {
    const { userId } = req.params;

    Review.find({userId})
        .then(reviews => res.status(200).json({reviews}))
        .catch(err => res.status(500).json({errorMessage: err}))
})

// FIXME check if needed
// get review
router.get("user/:userId/reviews/:reviewId", (req, res) => {

    const { userId, reviewId } = req.params;
    Review.find({userId, reviewId})
        .then(review => res.status(200).json({review}))
        .catch(err => res.status(500).json({errorMessage: err}))
});

//edit review
router.put("user/:userId/reviews/:reviewId", (req, res) => {
    const { userId, reviewId } = req.params;
    const { review } = req.body;
    if(userInSession.id === userId) {
        Review.findOneAndUpdate({reviewId}, review, {
            new: true
        })
            .then(review => res.status(200).json({review}))
            .catch(err => res.status(500).json({errorMessage: err}))
    } else {
        res.status(403).json();
    }
})

//add new review
router.post("user/:userId/reviews/add", (req, res) => {
    const { userId } = req.params;
    const { review } = req.body;
    if(userInSession.id === userId) {
        Review.create(review)
            .then(review => res.status(200).json({review}))
            .catch(err => res.status(500).json({errorMessage: err}))
    } else {
        res.status(403).json();
    }
})

// delete review
router.delete("user/:userId/reviews/:reviewId/delete", (req, res) => {
    const { userId, reviewId } = req.params;

    if(userInSession.id === userId) {
        Review.findOneAndDelete({reviewId})
            .then(() => res.status(200).json())
            .catch(err => res.status(500).json({errorMessage: err}))
    } else {
        res.status(403).json();
    }
})