const { connectDB } = require("./DB/connection");
const collectionRouter = require("./modules/collection/collection.controller");
const booksRouter = require("./modules/books/books.controller");
const logsRouter = require("./modules/logs/logs.controller");

const bootstrap = async (app, express, port) => {
  app.use(express.json());

  // connect to MongoDB first
  await connectDB();

  // routers
  app.use("/collection", collectionRouter);
  app.use("/books", booksRouter);
  app.use("/logs", logsRouter);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  // global error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
  });

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

module.exports = bootstrap;
