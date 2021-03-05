const express = require("express");
const bds = require("../index");
const fs = require("fs");
const app = express();
const path = require("path")
var cors = require('cors');
const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(cors());
app.use(require("body-parser").json()); /* https://github.com/github/fetch/issues/323#issuecomment-331477498 */
app.use(limiter);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/info", (req, res) => {
    const json_http = {
        "status": "Executando",
        "version": require("./package.json").version
    }
    return res.send(json_http);
});
app.get("/", (req, res) => {
    return res.send("O endpoint esta executando");
});
const http_port = "2474"
app.listen(http_port);