const { MongoClient } = require("salvage.db");
const db = new MongoClient({
  mongoURI: require("./token.json").mongo,
  schema: {
    name: "stardb",
  },
});
module.exports = db;