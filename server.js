//Install express server
const express = require("express");
const path = require("path");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static("./dist/Gfunal"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/Gfunal/index.html"));
});

// Start the app by listening on the default Heroku port
 app.listen(process.env.PORT || 8080);
// app.listen(80);

// var port = process.env.PORT || 80;

// app.listen(port, function () {
//   console.log(" app listening on port " + port + "!");
// });
