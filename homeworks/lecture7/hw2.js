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

const http = require("http");

const server = http.createServer((req, res) => {
    const { url, method } = req;
    if (method === "GET") {
        // Parse URL
        const urlParsed = new URL("http://localhost:3000" + url);
        // Get parameter
        const time = urlParsed.searchParams.get("iso");
        if (time === NaN) {
            res.end("Wrong parameter provided");
        }
        // Parse time
        const dateObject = new Date(time);

        if (urlParsed.pathname === "/api/parsetime") {
            const result = {
                hour: dateObject.getUTCHours(),
                minute: dateObject.getUTCMinutes(),
                second: dateObject.getUTCSeconds(),
            };
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(result));
            res.end();
        } else if (urlParsed.pathname === "/api/unixtime") {
            const result = { unixtime: dateObject.getTime() };
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(result));
            res.end();
        } else {
            res.end("404 API not found");
        }
    } else {
        res.end("Unsupported method");
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
