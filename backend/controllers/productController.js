const db = require("../db");

// GET ALL
exports.getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// GET BY ID
exports.getProductById = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }

      res.json(result[0]);
    }
  );
};

// CREATE
exports.createProduct = (req, res) => {
  const { name, category, price, image, stock } = req.body;

  if (!name || !category || !price || !image || stock == null) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql =
    "INSERT INTO products (name, category, price, image, stock) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, category, price, image, stock], (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// UPDATE
exports.updateProduct = (req, res) => {
  const { name, category, price, image, stock } = req.body;

  const sql =
    "UPDATE products SET name=?, category=?, price=?, image=?, stock=? WHERE id=?";

  db.query(
    sql,
    [name, category, price, image, stock, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Not found" });
      }

      res.json({ message: "Updated successfully" });
    }
  );
};

// DELETE
exports.deleteProduct = (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Not found" });
      }

      res.json({ message: "Deleted successfully" });
    }
  );
};