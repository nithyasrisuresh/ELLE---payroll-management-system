const db = require('../config/db');

exports.generate = async (req, res) => {
  const { employee_id, month, allowances, deductions } = req.body;
  const [emp] = await db.query('SELECT basic_salary FROM employees WHERE id = ?', [employee_id]);
  if (emp.length === 0) return res.status(404).json({ message: 'Employee not found' });

  const basic = emp[0].basic_salary;
  const net_salary = parseFloat(basic) + parseFloat(allowances) - parseFloat(deductions);

  await db.query(
    'INSERT INTO payroll (employee_id, month, basic, allowances, deductions, net_salary) VALUES (?,?,?,?,?,?)',
    [employee_id, month, basic, allowances, deductions, net_salary]
  );
  res.json({ message: 'Payroll generated', net_salary });
};

exports.getAll = async (req, res) => {
  const [rows] = await db.query(
    `SELECT p.*, e.name as employee_name 
     FROM payroll p 
     JOIN employees e ON p.employee_id = e.id`
  );
  res.json(rows);
};