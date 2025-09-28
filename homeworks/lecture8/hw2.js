/**
 * https://hn.algolia.com/api
 *
 * write a router function that takes two query parameters: query1 and query2
 * and returns the partial result from the following query in order:
 * https://hn.algolia.com/api/v1/search?query=query1&tags=story
 * https://hn.algolia.com/api/v1/search?query=query2&tags=story
 *
 * e.g. http://localhost:3000/hw2?query1=apple&query2=banana
 *
 * result from https://hn.algolia.com/api/v1/search?query=apple&tags=story:
 * {
 *  "hits": [
 *   {
 *   "created_at": "2020-11-12T21:00:12.000Z",
 *   "title": "macOS unable to open any non-Apple application",
 *   ...
 *   }
 * ]}
 *
 * result from https://hn.algolia.com/api/v1/search?query=banana&tags=story:
 * {
 *  "hits": [
 *   {
 *   "created_at": "2010-06-14T12:54:07.000Z",
 *   "title": "Banana equivalent dose",
 *   ...
 *   }
 * ]}
 *
 * final result from http://localhost:3000/hw2?query1=apple&query2=banana:
 * {
 *   "apple":
 *   {
 *     "created_at": "2020-11-12T21:00:12.000Z",
 *     "title": "macOS unable to open any non-Apple application"
 *   },
 *  "banana":
 *  {
 *   "created_at": "2010-06-14T12:54:07.000Z",
 *   "title": "Banana equivalent dose"
 *  }
 * }
 */
const express = require("express");
const https = require("https");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
app.get("/", (req, res) => {
    res.send("This is the home page");
});

function requestJSON(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                resolve(JSON.parse(data));
            });
        });
    });
}

app.get("/hw2/", (req, res) => {
    if (req.query.query1 === undefined || req.query.query2 === undefined) {
        return res.send("Wrong parameter provided");
    }
    const query1 = req.query.query1;
    const query2 = req.query.query2;
    let result = {};
    result[query1] = {};
    result[query2] = {};
    Promise.all([
        requestJSON(
            `https://hn.algolia.com/api/v1/search?query=${query1}&tags=story`
        ),
        requestJSON(
            `https://hn.algolia.com/api/v1/search?query=${query2}&tags=story`
        ),
    ]).then((results) => {
        result[query1]["created_at"] = results[0]["hits"][0]["created_at"];
        result[query1]["title"] = results[0]["hits"][0]["title"];
        result[query2]["created_at"] = results[1]["hits"][0]["created_at"];
        result[query2]["title"] = results[1]["hits"][0]["title"];
        res.json(result);
    });
});
