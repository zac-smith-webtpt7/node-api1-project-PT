// implement your API here

const express = require("express");
const helmet = require("helmet");

const db = require("./data/db.js");

// create a server
const server = express();

// middleware

server.use(express.json());
server.use(helmet());

// route handlers

server.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to NodeJS"
  });
});

// GET /api/users ~ MVP

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
        message: `The users information could not be retrieved. /GET/api/users: ${err}`
      });
    });
});

// GET /api/users/:id ~ MVP
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({
          success: true,
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: `he user with id ${id} does not exist`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `The user with id ${id} information could not be retrieved`
      });
    });
});

// POST /api/users ~ MVP
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  const { id, name, bio } = req.body;

  if (!newUser.name || !newUser.bio) {
    res.status(400).json({
      success: false,
      message: `Please provide name and bio for the user`
    });
  } else {
    db.insert(newUser)
      .then(user => {
        res.status(201).json({
          success: true,
          user,
          name
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: `Unable to insert new user: ${err}`
        });
      });
  }
});

// PUT /api/users/:id ~ MVP
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changeInfo = req.body;

  db.findById(id)
    .then(user => {
      if (!user) {
        // status 404
        res.status(404).json({
          success: false,
          message: `That user with id ${id} does not exist on this server`
        });
      } else if (!changeInfo.name || !changeInfo.bio) {
        // status 400
        res.status(400).json({
          success: false,
          message: `Please provide name and bio for user id ${id}`
        });
      } else {
        // status 200 and 500
        db.update(id, changeInfo)
          .then(changeInfo => {
            res.status(200).json({
              success: true,
              id,
              changeInfo
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              message: `Unable to update: ${err}`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `ERROR`
      });
    });

  // Does not contain full MVP

  // db.update(id, changeInfo)
  //   .then(changeInfo => {
  //     if (changeInfo) {
  //       res.status(200).json({
  //         success: true,
  //         changeInfo
  //       });
  //     } else {
  //       res.status(404).json({
  //         success: false,
  //         message: `Cannot update id ${id}`
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       success: false,
  //       message: `Unable to update: ${err}`
  //     });
  //   });
});

// DELETE /api/users/:id ~ MVP
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(removeUser => {
      if (removeUser) {
        res.status(200).json({
          success: true,
          message: `id ${id} has been deleted`
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The user with id ${id} does not exist`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `The user could not be removed. DELETE is not working!`
      });
    });
});

// server.listen
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`\n=== Server is listening on port ${PORT} ===\n`);
});
