const postController = require('../controllers/postController');
const router = require('express').Router();
const upload = require('../middleware/upload');

router.post('/addPost', upload.array('imgURLs') , postController.addPost);

module.exports = router;