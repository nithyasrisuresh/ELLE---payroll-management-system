const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length === 0) return res.status(401).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, rows[0].password_hash);
  if (!valid) return res.status(401).json({ message: 'Wrong password' });

  const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, process.env.JWT_SECRET);
  res.json({ token, role: rows[0].role });
};