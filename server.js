// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();

// Sets up the Express app to handle data parsing
app.use(express.static(__dirname + "/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/api-routes.js")(app);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
    // res.render("index");
  });

  app.get("/key", (req, res) => {
    res.send(process.env.API_KEY);
  });

  // Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  