// implement your API here

const express = require("express");

const db = require("./data/db.js");

// create a server
const server = express();

// middleware
server.use(express.json());

// route handlers

server.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to NodeJS"
  });
});

// GET /api/users

server.get("/api/users", (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json({
        success: true,
        data
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Unable to locate /GET/api/users"
      });
    });
});

// GET /api/users/:id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(id => {
      res.status(200).json({
        success: true,
        id
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `Unable to locate user with id ${id}`
      });
    });
});

// POST /api/users

// PUT /api/users/:id

// DELETE /api/users/:id

// server.listen
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`\n=== Server is listening on port ${PORT} ===\n`);
});
