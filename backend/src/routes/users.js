const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.get('/profile', authMiddleware, getProfile);
router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

module.exports = router; 