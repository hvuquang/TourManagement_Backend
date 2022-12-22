const postController = require('../controllers/postController');
const router = require('express').Router();
const upload = require('../middleware/upload');


/**
 * @swagger
 *  components:
 *     schemas:
 *         Post:
 *             type : object
 *             properties:
 *                  _id:
 *                     type: string
 *                  title:
 *                     type: string
 *                  des:
 *                     type: string
 *                  like:
 *                     type: number
 *                  imgURLs:
 *                     type: string
 */


router.post('/addPost', upload.array('imgURLs') , postController.addPost);

/**
 * @swagger
 * /v1/post/readPost:
 *    get:
 *       tags:
 *         - Post:
 *       summary: API này dùng để lấy tất cả các bài Post
 *       responses: 
 *             200:
 *                description: 
 *                content:
 *                   application/json:
 *                          schema:
 *                             type: array
 *                             items: 
 *                                 $ref : '#components/schemas/Post'
 */
router.get('/readPost', postController.readPost);

/**
 * @swagger
 * /v1/post/deletePost:
 *   delete:
 *     tags:
 *        - Post:
 *     summary: API này dùng để xóa bài Post
 *     requestBody:
 *           required: true
 *           content: 
 *               application/json:
 *                   schema:
 *                       $ref : '#components/schemas/Post'
 *     responses: 
 *             200:
 *                description: Post deleted successfully
 *             500:
 *                description: Failed to delete post
 */
router.delete('/deletePost/:id', postController.deletePost);


/**
 * @swagger
 * /v1/post/likePost:
 *  put:
 *     tags:
 *        - Post:
 *     summary: API này dùng để cập nhật dữ liệu
 *     requestBody:
 *           required: true
 *           content: 
 *               application/json:
 *                   schema:
 *                       $ref : '#components/schemas/Post'
 *     responses: 
 *             200:
 *                description: 
 *                content:
 *                   application/json:
 *                          schema:
 *                             type: array
 *                             items: 
 *                                 $ref : '#components/schemas/Post'
 */
router.put('/likePost',postController.likePost);
router.post('/updatePost/:id', postController.updatePost);

module.exports = router;