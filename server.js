const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Client } = require("pg");

// Параметри з'єднання з базою даних PostgreSQL
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Hero", // Змініть назву бази даних на відповідну
  password: "6006059a", // Змініть пароль на відповідний
  port: 5432,
});

// Middleware для розпарсування JSON даних
app.use(bodyParser.json());

// Підключення до бази даних
client
  .connect()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

// Маршрут для отримання списку супергероїв
app.get("/heroes", (req, res) => {
  const query = "SELECT * FROM heroes"; // Змініть назву таблиці на відповідну
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

// Маршрут для додавання нового супергероя
app.post("/heroes/add", (req, res) => {
  const { nickname, name, description, superpowers, phrase } = req.body;
  const query =
    "INSERT INTO heroes (nickname, name, description, superpowers, phrase) VALUES ($1, $2, $3, $4, $5) RETURNING *"; // Змініть назву таблиці на відповідну
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

// Маршрут для видалення супергероя
app.delete("/heroes/:id", (req, res) => {
  const superheroId = req.params.id;
  const query = "DELETE FROM heroes WHERE id = $1"; // Змініть назву таблиці на відповідну
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

// Прослуховування порту 5500
app.listen(5500, () => {
  console.log("Server is running on port 5500");
});
