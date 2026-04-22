const express = require("express");
const userRoutes = require("./userRoutes");
const guestRoutes = require("./guestRoutes");
const router = express.Router();
const baseUrl = "/api/v1";
router.use(`${baseUrl}/user`, userRoutes);
router.use(`${baseUrl}/guest`, guestRoutes);

module.exports = router;
