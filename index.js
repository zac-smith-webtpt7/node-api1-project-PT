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
        message: `Unable to locate /GET/api/users: ${err}`
      });
    });
});

// GET /api/users/:id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      res.status(200).json({
        success: true,
        user
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
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(user => {
      res.status(201).json({
        success: true,
        user
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `Unable to insert new user: ${err}`
      });
    });
});

// PUT /api/users/:id

// DELETE /api/users/:id

// server.listen
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`\n=== Server is listening on port ${PORT} ===\n`);
});
