const express = require("express");
const userRoutes = require("./userRoutes");
const guestRoutes = require("./guestRoutes");
const eventRoutes = require("./eventRoutes");
const paymentRoutes = require("./paymentRoutes");
const router = express.Router();
const baseUrl = "/api/v1";
router.use(`${baseUrl}/user`, userRoutes);
router.use(`${baseUrl}/guest`, guestRoutes);
router.use(`${baseUrl}/event`, eventRoutes);
router.use(`${baseUrl}/payment`, paymentRoutes);

module.exports = router;
