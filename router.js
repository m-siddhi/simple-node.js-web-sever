const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  let filePath = "";
  let statusCode = 200;

  if (req.url === "/" || req.url === "/home") {
    filePath = path.join(__dirname, "pages", "home.html");
  } else if (req.url === "/about") {
    filePath = path.join(__dirname, "pages", "about.html");
  } else if (req.url === "/contact") {
    filePath = path.join(__dirname, "pages", "contact.html");
  } else if (req.url.startsWith("/styles/")) {
    filePath = path.join(__dirname, req.url);
  } else {
    filePath = path.join(__dirname, "pages", "404.html");
    statusCode = 404;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Server error");
    } else {
      res.statusCode = statusCode;
      res.setHeader(
        "Content-Type",
        req.url.endsWith(".css") ? "text/css" : "text/html"
      );
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
