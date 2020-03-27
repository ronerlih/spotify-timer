const router = require("express").Router();
// const bookRoutes = require("./books");
// const userRoutes = require("./user");
const workerRoutes = require("./worker");
const spotifyRoutes = require("./spotify");
// const redisClient = require('../../scripts/redis');

// console.log(redisClient)
// /api/book routes
// router.use("/books", bookRoutes);

// /api/user routes
// router.use("/user", userRoutes);

// /api/worker routes
router.use("/worker", workerRoutes);

// /api/spotify routes
router.use("/spotify", spotifyRoutes);


module.exports = router;
