const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/") {
    res.end(JSON.stringify({
      name: "BitChord Lossless Addon",
      status: "running"
    }));
  } 
  else if (req.url === "/manifest.json") {
    res.end(JSON.stringify({
      id: "bitchord-lossless",
      name: "BitChord Lossless Addon",
      version: "1.0.0",
      description: "Lossless music resolver for BitChord",
      resources: ["search", "stream"]
    }));
  } 
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
