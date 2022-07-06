const e = require("express");
const express = require("express");

const app = express();

const path = require("path");

const cors = require("cors");

const { logger } = require("./middleware/logEvents");

const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

// cross origin resource sharing middleware
const whitelist = ["http://localhost:3000", "https://www.google.com"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

/**
 * built-in middleware to handle url encoded data
 * in other words, form data
 * 'content-type': 'application/x-www-form-urlencoded'
 */
app.use(express.urlencoded({ extended: true }));

// built-in middleware to handle json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "Not found" });
  } else {
    res.type("txt").send("Not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
