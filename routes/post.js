const postController = require('../controllers/postController');
const router = require('express').Router();
const upload = require('../middleware/upload');


router.post('/addPost', upload.array('imgURLs') , postController.addPost);

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

/**
 * @swagger
 * /v1/post/readPost:
 *    get:
 *       summary: API này dùng để lấy tất cả các bài Post từ MongoDB
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
 * /v1/post/likePost:
 *  put:
 *     summary: API này dùng để cập nhật dữ liệu tới Mongodb
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


module.exports = router;