const { getDB } = require("../../DB/connection");

// 1. explicit collection "books" with validation: non-empty title
const createBooksCollection = async () => {
  return getDB().command({
    create: "books",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
            description: "title must be a non-empty string",
          },
        },
      },
    },
  });
};

// 2. implicit collection "authors" (created by inserting directly)
const createAuthor = async (data) => {
  return getDB().collection("authors").insertOne(data);
};

// 3. capped collection "logs" with 1MB size limit
const createCappedLogs = async () => {
  await getDB().createCollection("logs", { capped: true, size: 1024 * 1024 });
  return { ok: 1 };
};

// 4. index on books.title
const createTitleIndex = async () => {
  return getDB().collection("books").createIndex({ title: 1 });
};

module.exports = {
  createBooksCollection,
  createAuthor,
  createCappedLogs,
  createTitleIndex,
};
