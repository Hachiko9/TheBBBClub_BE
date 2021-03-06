// routes/auth.routes.js

const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const mongoose = require("mongoose");

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .post() route ==> to process form data
router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });
    return;
  }

  // make sure passwords are strong:

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(400).json({
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        // username: username
        username,
        email,
        // password => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        password: hashedPassword,
      });
    })
    .then((user) => {
      Session.create({
        userId: user._id,
        createdAt: Date.now(),
      }).then((session) => {
        res.status(200).json({ accessToken: session._id, user });
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(409).json({
          errorMessage:
            "Username and email need to be unique. Either username or email is already used.",
        });
      } else {
        res.status(500).json({ errorMessage: error });
      }
    }); // close .catch()
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .post() login route ==> to process form data
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(500).json({
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  await User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.status(400).json({errorMessage: "Email is not registered. Try with other email."});
      } else if (bcryptjs.compareSync(password, user.password)) {
        await Session.create({
          userId: user._id,
          createdAt: Date.now(),
        }).then((session) => res.status(200).json({ accessToken: session._id, user }));
      } else {
        res.status(400).json({ errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => res.status(500).json({ errorMessage: error }));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post("/logout", (req, res) => {
  Session.deleteOne({
    userId: req.body.userId,
  })
    .then((session) => {
      res.status(200).json({ success: "User was logged out" });
    })
    .catch((error) => res.status(500).json({ errorMessage: error }));
});

router.get("/session/:accessToken", (req, res) => {
  const { accessToken } = req.params;
  Session.findById({ _id: accessToken }).populate("userId").then((session) => {
    if (!session) {
      res.status(409).json({
        errorMessage: "Session does not exist",
      });
    } else {
      res.status(200).json({session});
    }
  })
  .catch(err => res.status(500).json({errorMessage: err}))
});

router.post("/:userId/like", async (req, res) => {
  const { userId } = req.params;
  const {movieId} = req.body;

  if(userId) {
    const user = await User.findOne({_id: userId}).exec();

    if (!user.favouriteMoviesIds.includes(movieId)) {
      const newIds = [...user.favouriteMoviesIds, movieId];
      await User.findOneAndUpdate({_id: userId}, {favouriteMoviesIds: newIds}, { new: true })
      return res.status(200).json({user})
    } else {
      console.log('user.favouriteMoviesIds => ', user.favouriteMoviesIds);
      console.log('user.favouriteMoviesIds.filter((id) => Number(id) !== movieId) => ', user.favouriteMoviesIds.filter((id) => Number(id) !== movieId));
      const newIds = user.favouriteMoviesIds.filter((id) => Number(id) !== movieId);
      await User.findOneAndUpdate({_id: userId}, {favouriteMoviesIds: newIds}, { new: true })
      return res.status(200).json({user})
    }
  } else {
    res.status(403).json();
  }
})

module.exports = router;
