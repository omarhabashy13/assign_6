const { Router } = require("express");
const service = require("./collection.service");

const router = Router();

// Q1: POST /collection/books
router.post("/books", async (req, res, next) => {
  try {
    const result = await service.createBooksCollection();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// Q3: POST /collection/logs/capped
router.post("/logs/capped", async (req, res, next) => {
  try {
    const result = await service.createCappedLogs();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// Q4: POST /collection/books/index
router.post("/books/index", async (req, res, next) => {
  try {
    const indexName = await service.createTitleIndex();
    res.status(201).json(indexName);
  } catch (error) {
    next(error);
  }
});

// Q2: POST /collection/authors
router.post("/authors", async (req, res, next) => {
  try {
    const result = await service.createAuthor(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
