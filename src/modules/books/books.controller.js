const { Router } = require("express");
const service = require("./books.service");

const router = Router();

// Q6: POST /books/batch
router.post("/batch", async (req, res, next) => {
  try {
    if (!Array.isArray(req.body) || req.body.length < 3) {
      return res
        .status(400)
        .json({ message: "Send an array with at least three books" });
    }
    res.status(201).json(await service.insertBooks(req.body));
  } catch (error) {
    next(error);
  }
});

// Q5: POST /books
router.post("/", async (req, res, next) => {
  try {
    res.status(201).json(await service.insertBook(req.body));
  } catch (error) {
    next(error);
  }
});

// Q9: GET /books/title?title=Brave New World
router.get("/title", async (req, res, next) => {
  try {
    const book = await service.findByTitle(req.query.title);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    next(error);
  }
});

// Q10: GET /books/year?from=1990&to=2010
router.get("/year", async (req, res, next) => {
  try {
    const from = Number(req.query.from);
    const to = Number(req.query.to);
    res.json(await service.findByYearRange(from, to));
  } catch (error) {
    next(error);
  }
});

// Q11: GET /books/genre?genre=Science Fiction
router.get("/genre", async (req, res, next) => {
  try {
    res.json(await service.findByGenre(req.query.genre));
  } catch (error) {
    next(error);
  }
});

// Q12: GET /books/skip-limit
router.get("/skip-limit", async (req, res, next) => {
  try {
    res.json(await service.skipLimit());
  } catch (error) {
    next(error);
  }
});

// Q13: GET /books/year-integer
router.get("/year-integer", async (req, res, next) => {
  try {
    res.json(await service.yearInteger());
  } catch (error) {
    next(error);
  }
});

// Q14: GET /books/exclude-genres
router.get("/exclude-genres", async (req, res, next) => {
  try {
    res.json(await service.excludeGenres());
  } catch (error) {
    next(error);
  }
});

// Q16: GET /books/aggregate1
router.get("/aggregate1", async (req, res, next) => {
  try {
    res.json(await service.aggregate1());
  } catch (error) {
    next(error);
  }
});

// Q17: GET /books/aggregate2
router.get("/aggregate2", async (req, res, next) => {
  try {
    res.json(await service.aggregate2());
  } catch (error) {
    next(error);
  }
});

// Q18: GET /books/aggregate3
router.get("/aggregate3", async (req, res, next) => {
  try {
    res.json(await service.aggregate3());
  } catch (error) {
    next(error);
  }
});

// Q19: GET /books/aggregate4
router.get("/aggregate4", async (req, res, next) => {
  try {
    res.json(await service.aggregate4());
  } catch (error) {
    next(error);
  }
});

// Q8: PATCH /books/Future  (body: { "year": 2022 })
router.patch("/:title", async (req, res, next) => {
  try {
    const year = req.body.year !== undefined ? Number(req.body.year) : 2022;
    res.json(await service.updateBookYear(req.params.title, year));
  } catch (error) {
    next(error);
  }
});

// Q15: DELETE /books/before-year?year=2000
router.delete("/before-year", async (req, res, next) => {
  try {
    const year = Number(req.query.year);
    res.json(await service.deleteBeforeYear(year));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
