/**
 * Refactor hw1 and hw2 in lecture 7 in Express.js.
 * Requirements:
 * 1. make two routers, one for hw1 and one for hw2;
 * 2. hw1 should be able to handle requests with url params, rather than command-line arguments;
 *  - e.g. http://localhost:3000/hw1/<dir>/<ext>
 *  - `dir` only support one level down from the current repository,
 *    i.e http://localhost:3000/hw1/test/txt.
 *    You don't need to handle the case like http://localhost:3000/hw1/test/test/txt.
 * 3. hw2 should be able to handle requests with query strings like it did in lecture 7;
 */

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
app.get("/", (req, res) => {
    res.send("This is the home page");
});

// hw1
app.get(
    "/hw1/*parameters",
    (req, res, next) => {
        const extension = "." + req.params.parameters.slice(-1)[0];
        const currentDir =
            __dirname +
            "/" +
            req.params.parameters.slice(0, -1).join("/") +
            "/";
        fs.readdir(currentDir, (err, files) => {
            if (err) {
                // Stop here if error occurs
                res.send(`Error reading directory: ${currentDir}`);
            } else {
                // Go to next function and pass values needed
                res.locals.files = files;
                res.locals.extension = extension;
                next();
            }
        });
    },
    (req, res) => {
        let result = "";
        res.locals.files.forEach((file) => {
            if (path.extname(file) === res.locals.extension) {
                result += file;
                result += "\n";
            }
        });
        result = result.trimEnd(); // Delete the last \n
        console.log(result);
        result = result.replace(/\n/g, "<br/>"); // Change text into html
        res.send(result);
    }
);

// hw2
app.get("/hw2/parsetime/", (req, res) => {
    if (req.query.iso === undefined) {
        return res.send("Wrong parameter provided");
    }
    const time = req.query.iso;
    const dateObject = new Date(time);
    const result = {
        hour: dateObject.getUTCHours(),
        minute: dateObject.getUTCMinutes(),
        second: dateObject.getUTCSeconds(),
    };
    res.json(result);
});

app.get("/hw2/unixtime/", (req, res) => {
    if (req.query.iso === undefined) {
        return res.send("Wrong parameter provided");
    }
    const time = req.query.iso;
    const dateObject = new Date(time);
    const result = { unixtime: dateObject.getTime() };
    res.json(result);
});
