// fileService.js — helper to read files and set headers
const fs = require("fs").promises;
const path = require("path");

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "application/javascript";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

async function serveFile(filePath, res, statusCode = 200) {
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(statusCode, { "Content-Type": getContentType(filePath) });
    res.end(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      // File not found — send 404 page
      const file404 = path.join(__dirname, "pages", "404.html");
      return serveNotFound(file404, res);
    }
    console.error("serveFile error", err);
    // Generic server error
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 - Internal Server Error");
  }
}

async function serveNotFound(file404Path, res) {
  try {
    const data = await fs.readFile(file404Path);
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  } catch (err) {
    console.error("404 page read error", err);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  }
}

module.exports = { serveFile, serveNotFound };
