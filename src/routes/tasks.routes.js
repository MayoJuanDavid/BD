const { Router } = require("express");
const pool = require("../db");
const router = Router();

router.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  console.log(result);
  res.json(result.rows[0].now);
});

router.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  console.log(result);
  res.json(result.rows[0]);
});

router.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    // Verifica que se hayan proporcionado tanto la descripción como el estado
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Both description and status are required" });
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/tasks/10", (req, res) => {
  res.send("Esto da el put");
});

router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  res.json(result.rows[0]);
});

module.exports = router;
