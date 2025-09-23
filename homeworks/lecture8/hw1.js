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

//HW1
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 8000;

// Route: /hw1/:dir/:ext
app.get("/hw1/:dir/:ext", (req, res) => {
  const { dir, ext } = req.params;

  // Only allow single-level directories (no nested paths or path traversal)
  if (dir.includes("/") || dir.includes("..")) {
    return res
      .status(400)
      .send("Invalid directory. Only one-level subdirectories are allowed.");
  }

  const dirPath = path.join(__dirname, dir); // e.g., ./test
  const extFilter = "." + ext; // e.g., .txt

  //   console.log(dirPath);
  //   console.log(extFilter);

  // Read the directory
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(404).send("Directory not found or inaccessible.");
    }

    // Filter files by extension
    const matchedFiles = files.filter(
      (file) => path.extname(file) === extFilter
    );
    res.status(200).json(matchedFiles);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//HW2
//request /api/parsetime?iso=2023-05-22T12:34:56.789Z
app.get("/api/parsetime", (req, res) => {
  //   console.log(req);
  const isoTime = req.query.iso;

  if (!isoTime) {
    return res.status(400).json({ error: "Missing iso query parameter" });
  }
  const date = new Date(isoTime);

  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: "Invalid ISO date" });
  }

  const time = {
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
  };
  res.status(200).json(time);

  //   console.log(time);
});

//request /api/unixtime?iso=2023-05-22T12:34:56.789Z
app.get("/api/unixtime", (req, res) => {
  const isoTime = req.query.iso;
  if (!isoTime) {
    return res.status(400).json({ error: "Missing iso query parameter" });
  }
  const date = new Date(isoTime);

  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: "Invalid ISO date" });
  }

  const time = {
    unixtime: date.getTime(),
  };
  //   console.log(time);

  res.status(200).json(time);
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
