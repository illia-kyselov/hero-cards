const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Hero",
  password: "6006059a",
  port: 5432,
});

client
  .connect()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.get("/heroes", (req, res) => {
  const query = "SELECT * FROM heroes";
  client
    .query(query)
    .then((results) => {
      res.json(results.rows);
    })
    .catch((error) => {
      console.error("Error retrieving superheroes from database", error);
      res
        .status(500)
        .json({ error: "Error retrieving superheroes from database" });
    });
});

app.post("/heroes/add", (req, res) => {
  const { nickname, name, description, superpowers, phrase } = req.body;
  const query =
    "INSERT INTO heroes (nickname, name, description, superpowers, phrase) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [nickname, name, description, superpowers, phrase];

  client
    .query(query, values)
    .then((results) => {
      res.json(results.rows[0]);
    })
    .catch((error) => {
      console.error("Error adding superhero to database", error);
      res.status(500).json({ error: "Error adding superhero to database" });
    });
});

app.delete(`/heroes/:id`, (req, res) => {
  const superheroId = req.params.id;
  const query = "DELETE FROM heroes WHERE id = $1";
  const values = [superheroId];

  client
    .query(query, values)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error deleting superhero from database", error);
      res.status(500).json({ error: "Error deleting superhero from database" });
    });
});

app.put("/heroes/:id", (req, res) => {
  const superheroId = req.params.id;
  const { nickname, name, description, superpowers, phrase } = req.body;
  const query =
    "UPDATE heroes SET nickname = $1, name = $2, description = $3, superpowers = $4, phrase = $5 WHERE id = $6 RETURNING *";
  const values = [
    nickname,
    name,
    description,
    superpowers,
    phrase,
    superheroId,
  ];

  client
    .query(query, values)
    .then((results) => {
      res.json(results.rows[0]);
    })
    .catch((error) => {
      console.error("Error updating superhero in the database", error);
      res
        .status(500)
        .json({ error: "Error updating superhero in the database" });
    });
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
