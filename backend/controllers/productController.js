const db = require("../db");

exports.getAllProducts = (req, res) => {
  let sql = "SELECT * FROM products WHERE 1=1";
  let params = [];

  const { category, search } = req.query;

  if (category) {
    sql += " AND LOWER(category) = LOWER(?)";
    params.push(category);
  }

  if (search) {
  sql += " AND LOWER(name) LIKE LOWER(?)";
  params.push(`%${search}%`);
}

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

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

exports.createProduct = (req, res) => {
  const { name, category, price, image, stock } = req.body;

  if (!name || !category || price == null || !image || stock == null) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (isNaN(price) || isNaN(stock)) {
    return res.status(400).json({ message: "Price and stock must be numbers" });
  }

  if (price <= 0 || stock < 0) {
    return res.status(400).json({ message: "Invalid values" });
  }

  const sql =
    "INSERT INTO products (name, category, price, image, stock) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, category, price, image, stock], (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateProduct = (req, res) => {
  const { name, category, price, image, stock } = req.body;

  if (!name || !category || price == null || !image || stock == null) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (isNaN(price) || isNaN(stock)) {
    return res.status(400).json({ message: "Invalid data type" });
  }

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