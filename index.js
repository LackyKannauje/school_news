const express = require("express");
const app = express();

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const connectDB = require("./connect");
const cors = require("cors");
const timeout = require("./middleware/timeout");

require('dotenv').config();

const PORT = process.env.PORT || 8001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(timeout);
const mongoDbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/school_news";
connectDB(mongoDbUri);

app.get("/", (req, res) => {
  res.send("Server is running...");
})

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => {
  console.log("server started!!");
});
