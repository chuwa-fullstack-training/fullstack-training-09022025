/**
 * Refactor hw3 in lecture 7 to use Express.js with template engine.
 */
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.listen(3000, () => console.log("Example app listening on port 3000!"));

app.get("/", (req, res) => {
    res.send("this is the home page");
});

app.get("/about", (req, res) => {
    res.send("this is the about page");
});

app.get("/home.html", (req, res) => {
    if (req.query.title === undefined || req.query.content === undefined) {
        title = "";
        content = "";
    } else {
        title = `Title:${req.query.title}`;
        content = `Content:${req.query.content}`;
    }
    res.render("home", { title: title, content: content });
});

app.get("*all", (req, res) => {
    res.send("this is the 404 page");
});

app.post("/create-post", (req, res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        // Redirect
        const parsedBody = Buffer.concat(body).toString();
        res.redirect(`/home.html?${parsedBody}`);
    });
});

app.post("*all", (req, res) => {
    res.send("this is the 404 page");
});

app.all("*all", (req, res) => {
    res.send("Unsupported method");
});
