const db = require('../config/db');

exports.getAll = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM employees');
  res.json(rows);
};

exports.create = async (req, res) => {
  const { name, email, phone, department_id, designation, basic_salary, join_date } = req.body;
  await db.query(
    'INSERT INTO employees (name, email, phone, department_id, designation, basic_salary, join_date) VALUES (?,?,?,?,?,?,?)',
    [name, email, phone, department_id, designation, basic_salary, join_date]
  );
  res.json({ message: 'Employee created successfully' });
};

exports.update = async (req, res) => {
  const { name, email, phone, designation, basic_salary } = req.body;
  await db.query(
    'UPDATE employees SET name=?, email=?, phone=?, designation=?, basic_salary=? WHERE id=?',
    [name, email, phone, designation, basic_salary, req.params.id]
  );
  res.json({ message: 'Employee updated successfully' });
};

exports.remove = async (req, res) => {
  await db.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
  res.json({ message: 'Employee deleted successfully' });
};