const { Router } = require("express");
const router = new Router();
const Review = require("../models/Review.model");
const User = require("../models/User.model");

// get reviews by movie
router.get("/movies/:movieId", async (req, res) => {
    const { movieId } = req.params;

    Review.find({movieId})
        .then(reviews => res.status(200).json({reviews}))
        .catch(err => res.status(500).json({errorMessage: err}))
})

// get reviews by user
router.get("/user/:author", async (req, res) => {
    const { author } = req.params;

    await Review.find({author})
        .then(reviews => res.status(200).json({reviews}))
        .catch(err => res.status(500).json({errorMessage: err}))
})

//add new review
router.post("/user/:userId/add", async (req, res) => {
    const { userId } = req.params;
    const review = req.body;

    if(userId) {
        await Review.create(review)
            .then(async (review) => {
                const user = await User.findOne({_id: userId}).exec();
                const newIds = [...user.reviewsIds, review._id];
                // newIds.push(review._id)
                await User.findOneAndUpdate({_id: userId}, {reviewsIds: newIds})
                return res.status(200).json({review})
            })
            .catch(err => {
                console.error(err)
                return res.status(500).json({errorMessage: err})
            })
    } else {
        res.status(403).json();
    }
})

// FIXME check if needed
// get review
router.get("/:reviewId/user/:userId", (req, res) => {
    const { userId, reviewId } = req.params;
    Review.find({userId, reviewId})
        .then(review => res.status(200).json({review}))
        .catch(err => res.status(500).json({errorMessage: err}))
});

//edit review
router.put("/:reviewId/user/:userId", (req, res) => {
    const { userId, reviewId } = req.params;
    const review = req.body;

    if(userId) {
        Review.findOneAndUpdate({_id: reviewId}, review, {new: true})
            .then(review => res.status(200).json({review}))
            .catch(err => res.status(500).json({errorMessage: err}))
    } else {
        res.status(403).json();
    }
})

// delete review
router.delete("/:reviewId/user/:userId/delete", (req, res) => {
    const { userId, reviewId } = req.params;

    if(userId) {
        Review.findOneAndDelete({_id: reviewId})
            .then(async (review) => {
                const user = await User.findOne({_id: userId}).exec();
                const newIds = user.reviewsIds.filter((id) => id !== reviewId);
                await User.findOneAndUpdate({_id: userId}, {reviewsIds: newIds})
                return res.status(200).json({review})
            })
            .catch(err => res.status(500).json({errorMessage: err}))
    } else {
        res.status(403).json();
    }
})

module.exports = router;
