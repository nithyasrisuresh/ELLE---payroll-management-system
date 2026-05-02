const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const { name, email, phone, department_id, designation, basic_salary, join_date } = req.body;
    await db.query(
      'INSERT INTO employees (name, email, phone, department_id, designation, basic_salary, join_date) VALUES (?,?,?,?,?,?,?)',
      [name, email, phone, department_id, designation, basic_salary, join_date]
    );
    res.json({ message: 'Employee created successfully' });
  } catch (err) {
    console.log('Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, email, phone, designation, basic_salary } = req.body;
    await db.query(
      'UPDATE employees SET name=?, email=?, phone=?, designation=?, basic_salary=? WHERE id=?',
      [name, email, phone, designation, basic_salary, req.params.id]
    );
    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};