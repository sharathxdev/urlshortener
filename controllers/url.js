const shortid = require('shortid');
const URL = require("../models/url");

async function handlegetanalytics(req, res) {
    const shortid = req.params.shortId; // ✅ corrected param name

    const result = await URL.findOne({ shortid }); // ✅ uses correct field name in DB

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" }); // ✅ prevents crash if not found
    }

    return res.json({
        totalclicks: result.visithistory.length,
        analytics: result.visithistory
    });
}



async function generateshorturl(req, res) {
    const id = shortid(); // generate unique ID
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }

    await URL.create({
        shortid: id,
        redirectedurl: body.url,
        visithistory: []
    });

    res.status(201).json({ message: "short URL created" });
}

module.exports = {
    generateshorturl,
    handlegetanalytics
};
