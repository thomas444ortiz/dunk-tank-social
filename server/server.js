const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// serve everything from the build folder
app.use(express.static(path.join(__dirname, "../build")));

// handle all other routes
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// global error handler
app.use("/", (err, req, res, next) => {
  const defaultErr = {
    log: "Global error handler caught an error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = { ...defaultErr, err };
  res.status(errorObj.status).json(errorObj.message);
});

// Starts the server on port 3000
app.listen(3000, (err) => {
  if (err) console.log("Error setting up server");
  console.log("Server running and ready to work :)");
});
