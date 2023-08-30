const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./Middleware/ErrorMiddleware");
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/setUserBvn", require("./routes/userBvnRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
