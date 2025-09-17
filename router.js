// router.js — routing logic
const path = require("path");
const { serveFile, serveNotFound } = require("./fileService");

// Map routes to file paths (relative to project root)
const ROUTES = {
  "/": "pages/home.html",
  "/home": "pages/home.html",
  "/about": "pages/about.html",
  "/contact": "pages/contact.html",
};

async function handleRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Serve static CSS under /styles/ or any assets under /assets/
  if (pathname.startsWith("/styles/") || pathname.startsWith("/assets/")) {
    const filePath = path.join(__dirname, pathname);
    return serveFile(filePath, res);
  }

  // If route is defined, serve corresponding HTML file
  if (ROUTES[pathname]) {
    const filePath = path.join(__dirname, ROUTES[pathname]);
    return serveFile(filePath, res, 200);
  }

  // Otherwise, return custom 404 page
  const file404 = path.join(__dirname, "pages", "404.html");
  return serveNotFound(file404, res);
}

module.exports = { handleRequest };
