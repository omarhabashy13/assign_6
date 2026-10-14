const { ObjectId } = require("mongodb");
const { getDB } = require("../../DB/connection");

// 7. insert a new log (book_id is stored as ObjectId so $lookup can join it with books._id)
const insertLog = (data) => {
  const log = { ...data };
  if (log.book_id && ObjectId.isValid(log.book_id)) {
    log.book_id = new ObjectId(log.book_id);
  }
  return getDB().collection("logs").insertOne(log);
};

module.exports = { insertLog };
