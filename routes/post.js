const postController = require('../controllers/postController');
const router = require('express').Router();

router.post('/addPost',postController.addPost);

module.exports = router;