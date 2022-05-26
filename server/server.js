const express = require("express");
const cors = require("cors");
const dashboard = require("./routes/dashboard.routes.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const db = require("./models");
const path = require("path");  

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(
  cors({
    credentials: true,
    origin:{ "http://localhost:3000"
    :
     "http://localhost:3006"},
  })
);
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/candidats", express.static(path.join("server/images")));

app.use(cookieParser());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome ." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8000;
//require("C:/Users/NADA/Desktop/dashboard/server/routes/dashboard.routes.js")(app);

require("C:/Users/NADA/Desktop/app/server/routes/user.routes.js")(app);

app.use("/dashboard", dashboard);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
