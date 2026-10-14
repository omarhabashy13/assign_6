const { getDB } = require("../../DB/connection");

const books = () => getDB().collection("books");

// 5. insert one book
const insertBook = (data) => books().insertOne(data);

// 6. insert many books
const insertBooks = (data) => books().insertMany(data);

// 8. update year of the book by title
const updateBookYear = (title, year) =>
  books().updateOne({ title }, { $set: { year } });

// 9. find a book by title
const findByTitle = (title) => books().findOne({ title });

// 10. books published between from and to (inclusive)
const findByYearRange = (from, to) =>
  books()
    .find({ year: { $gte: from, $lte: to } })
    .toArray();

// 11. books whose genres include a genre
const findByGenre = (genre) => books().find({ genres: genre }).toArray();

// 12. skip first 2, limit next 3, sorted by year desc
const skipLimit = () =>
  books().find().sort({ year: -1 }).skip(2).limit(3).toArray();

// 13. year stored as integer
const yearInteger = () => books().find({ year: { $type: "int" } }).toArray();

// 14. genres do not include Horror or Science Fiction
const excludeGenres = () =>
  books()
    .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
    .toArray();

// 15. delete books published before a year
const deleteBeforeYear = (year) => books().deleteMany({ year: { $lt: year } });

// 16. aggregation: year > 2000 sorted by year desc
const aggregate1 = () =>
  books()
    .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
    .toArray();

// 17. aggregation: year > 2000, project title, author, year only
const aggregate2 = () =>
  books()
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $project: { _id: 0, title: 1, author: 1, year: 1 } },
    ])
    .toArray();

// 18. aggregation: unwind genres
const aggregate3 = () =>
  books()
    .aggregate([
      { $unwind: "$genres" },
      { $project: { _id: 0, title: 1, genres: 1 } },
    ])
    .toArray();

// 19. aggregation: join logs with books ($lookup)
const aggregate4 = () =>
  getDB()
    .collection("logs")
    .aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "book_details",
        },
      },
      {
        $project: {
          _id: 0,
          action: 1,
          "book_details.title": 1,
          "book_details.author": 1,
          "book_details.year": 1,
        },
      },
    ])
    .toArray();

module.exports = {
  insertBook,
  insertBooks,
  updateBookYear,
  findByTitle,
  findByYearRange,
  findByGenre,
  skipLimit,
  yearInteger,
  excludeGenres,
  deleteBeforeYear,
  aggregate1,
  aggregate2,
  aggregate3,
  aggregate4,
};
