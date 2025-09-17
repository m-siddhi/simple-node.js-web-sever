# Assignment 6 — Simple Node.js Web Server

## Overview

A basic Node.js HTTP server using the built-in `http` module.  
Routes implemented: `/home`, `/about`, `/contact`. Custom `404` for invalid routes. Static CSS served from `/styles/`.

## Files included

- ss images of log demonstrating uploaded inside folder - logsDemonstartingImages

- `server.js` — entry point (creates server & logs requests)
- `router.js` — routing logic
- `fileService.js` — async file reading and content-type handling
- `pages/` — `home.html`, `about.html`, `contact.html`, `404.html`
- `styles/style.css`
- `package.json`

## How to run

1. Install Node.js (v14+ recommended).
2. Open terminal at project root.
3. Run:

```bash
node server.js
```
