const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("./config/db.config");

//Router definition
const userRouter = require("./routes/user.route");
const reviewsRouter = require("./routes/review.route");

const app = express();

//CORS configuration
app.use(
  cors({
    credentials: true,
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.ORIGIN
  })
);
app.set('port', (process.env.PORT || 8000));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req,res) => res.json("bananan"))

app.use("/user", userRouter);
app.use("/reviews", reviewsRouter);

app.listen(app.get('port'), () => {
    console.log(`server started at http://localhost:${app.get('port')}`);
});

module.exports = app;
