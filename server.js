const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Departments route — defined directly here
app.get('/api/departments', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM departments ORDER BY domain, name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Routes
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/payroll',   require('./routes/payrollRoutes'));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err.message);
});