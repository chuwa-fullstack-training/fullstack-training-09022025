/**
 * Implement a HTTP server that serves JSON data where user requests /api/parsetime and /api/unixtime.
 * For example, when the user requests /api/parsetime?iso=2023-05-22T12:34:56.789Z, the server should
 * respond with a JSON object containing only 'hour', 'minute' and 'second' properties.
 * {
 *  "hour": 12,
 *  "minute": 34,
 *  "second": 56
 * }
 * Similarly, when the user requests /api/unixtime?iso=2023-05-22T12:34:56.789Z, the server should
 * respond with a JSON object containing a 'unixtime' property.
 * {
 *  "unixtime": 1684758896789
 * }
 *
 * HINTS:
 * 1. Use url.parse() method to parse URL strings.
 * 2. response.writeHead(200, { contentType: 'application/json' })
 */

// your code here
const url = require("url");
const server = require("http").createServer();
const PORT = 8000;

server.on("request", (req, res) => {
  //   res.end("Hello....");
  //   const x = url.parse(req.url, true);
  //   console.log(x);
  const { pathname, query } = url.parse(req.url, true);
  const isoTime = query.iso;
  // console.log(isoTime);

  if (pathname === "/api/parsetime") {
    res.writeHead(200, {
      "Content-type": "application/json", //specify we are sending back json
    });
    const date = new Date(isoTime);
    // console.log(date);
    const time = {
      // hour: date.getHours(),
      // minute: date.getMinutes(),
      // seconds: date.getSeconds(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      seconds: date.getUTCSeconds(),
    };
    // console.log(time);
    // res.end(time);
    res.end(JSON.stringify(time));
  } else if (pathname === "/api/unixtime") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    const date = new Date(isoTime);
    const time = {
      unixtime: date.getTime(),
    };
    // console.log(time);

    res.end(JSON.stringify(time));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Listening to request on port ${PORT}`);
});
