// server.js — entry point
const http = require("http");
const router = require("./router");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Log every request (useful for screenshots/logs)
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Delegate request handling to router (returns a Promise)
  router.handleRequest(req, res).catch((err) => {
    // Global error handler — ensures we always respond
    console.error("Unhandled error:", err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Server Error");
    } else {
      res.end();
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
