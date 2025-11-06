const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.post('/', bookController.create);
router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);

module.exports = router;