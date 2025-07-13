const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");
connectDB(); // Connect to the database


app.use(express.json()); 
app.use("/", require("./Routes/contactsRoutes"));
app.use(errorHandler); // Use the error handler middleware

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});