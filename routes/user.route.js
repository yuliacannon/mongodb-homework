const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser);
router.put('/:id', userController.editUser);
router.get('/:id', userController.showUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id/articles', userController.showArticles)

module.exports = router;