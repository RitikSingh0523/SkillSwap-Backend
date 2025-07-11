const express = require("express");
const connectDB = require("./src/config/db");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const URI= process.env.MONGO_URI

const app = express();

connectDB(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err.message);
  });
