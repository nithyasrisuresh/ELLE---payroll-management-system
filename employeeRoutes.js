const router = require('express').Router();
const { getAll, create, update, remove } = require('../controllers/employeeController');
const db = require('../config/db');

// Get all departments — MUST be before '/:id' routes
router.get('/departments', async (req, res) => {  try {
    const [rows] = await db.query('SELECT * FROM departments ORDER BY domain, name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/',       getAll);
router.post('/',      create);
router.put('/:id',    update);
router.delete('/:id', remove);

module.exports = router;