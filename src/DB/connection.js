const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "assignment7";

const client = new MongoClient(uri);
let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
