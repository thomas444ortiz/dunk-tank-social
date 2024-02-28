const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

//Logs all incoming request
app.use("*", (req, res, next) => {
  console.log(`
  #######\n
  URL: ${req.method} ${req.url}\n
  Params: ${JSON.stringify(req.params)}\n
  Body: ${JSON.stringify(req.body)}
  #######
  `);
  next();
});

// serve everything from the build folder
app.use("/", express.static(path.join(__dirname, "../build")));

// serve index.html to any get request on the path '/'
app.get("/test", (req, res) =>
  res.status(200).json({})
);

// 404 error handler
app.use("/*", (req, res) => {
  res.status(404).send("Error: This page does not exist!");
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
