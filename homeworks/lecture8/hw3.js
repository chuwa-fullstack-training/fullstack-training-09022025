/**
 * Refactor hw3 in lecture 7 to use Express.js with template engine.
 */

const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PORT = 8000;

//middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("this is the home page");
});

app.get("/about", (req, res) => {
  res.status(200).send("this is the about page");
});

app.get("/home.html", (req, res) => {
  const filePath = path.join(__dirname, "home.html");
  fs.readFile(filePath, "utf-8", (err, html) => {
    if (err) return res.status(500).send("error loading HTML");

    // console.log(req.query);

    const { title, content } = req.query;

    const displayData =
      title || content
        ? `<p><strong>Title: </strong>${title}</p>
      <p><strong>Content: </strong>${content}</p>`
        : "";
    const responseHtml = html.replace("{%Input_Data%}", displayData);
    res.set("Content-Type", "text/html");
    res.status(200).send(responseHtml);
  });
});

app.post("/create-post", (req, res) => {
  //   console.log(req.body);

  //convert req.body into query string
  const queryString = new URLSearchParams(req.body).toString();

  //   console.log(queryString);

  res.redirect("/home.html?" + queryString);
});

app.use((req, res) => {
  res.status(404).send("this is the 404 page");
});

app.listen(PORT, () => {
  console.log(`Listening to request on port ${PORT}`);
});
