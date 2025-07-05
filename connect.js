const mongoose = require("mongoose")
async function connecttomongooedb(url) {
    return mongoose.connect(url);
}

module.exports = {
    connecttomongooedb
}