const http = require("http");
const { URL } = require("url");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const url = new URL(req.url, `http://${req.headers.host}`);

  // Main server page
  if (url.pathname === "/") {
    res.end(JSON.stringify({
      name: "BitChord Lossless Addon",
      status: "running"
    }));
  }

  // Add-on manifest
  else if (url.pathname === "/manifest.json") {
    res.end(JSON.stringify({
      id: "bitchord-lossless",
      name: "BitChord Lossless Addon",
      version: "1.0.0",
      description: "Lossless music resolver for BitChord",
      resources: ["search", "stream"]
    }));
  }

  // Search endpoint
  else if (url.pathname === "/search") {
    const query = url.searchParams.get("q") || "";

    res.end(JSON.stringify({
      query: query,
      tracks: []
    }));
  }

  // Not found
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({
      error: "Not found"
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
