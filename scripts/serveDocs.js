const express = require("express");
const { resolve: p } = require("path");

const app = express();

app.use(express.static(p(__dirname, "..", "docs", "coverage", "lcov-report")));
app.use(express.static(p(__dirname, "..", "docs", "schema")));

app.get("/schema", (req, res) => {
  return res.sendFile(p(__dirname, "..", "docs", "schema", "index.html"));
});

app.use((req, res) => {
  return res.sendFile(p(__dirname, "..", "docs", "coverage", "lcov-report", "index.html"));
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000/");
});
