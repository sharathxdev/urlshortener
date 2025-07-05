const express = require("express");
const app = express();
const port = 8001;
const URL = require("./models/url");
const { connecttomongooedb } = require("./connect");
const urlroute = require("./routes/url");
const { timeStamp } = require("console");

app.use(express.json());



connecttomongooedb("mongodb://localhost:27017/shorturl")
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Mongo connection failed", err));

app.use('/url', urlroute);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortid: shortId },
        {
            $push: {
                visithistory: {
                    timestamp: Date.now()
                }
            }
        }
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(
        entry.redirectedurl.startsWith('http') 
            ? entry.redirectedurl 
            : 'https://' + entry.redirectedurl
    );
});

  

app.listen(port, () => {
    console.log(`App started at port ${port}`);
});
// test push authentication
