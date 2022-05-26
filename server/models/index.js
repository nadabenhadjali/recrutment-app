const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.offre = require("./offre.model.js")(mongoose);
db.Question = require("./question.model.js")(mongoose);
db.subject = require("./subject.model.js")(mongoose);
db.Quiz = require("./quiz.model.js")(mongoose);
db.result = require("./result.model.js")(mongoose);
db.candidat = require("./candidat.js")(mongoose);
db.user = require("./user.js")(mongoose);

module.exports = db;
