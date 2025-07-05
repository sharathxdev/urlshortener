const express = require("express");
const router = express.Router();
const { generateshorturl , handlegetanalytics } = require("../controllers/url");

router.post("/", generateshorturl);

router.get("/analytics/:shortId",handlegetanalytics);

module.exports = router;
