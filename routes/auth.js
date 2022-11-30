const authController = require('../controllers/authController');
const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();


/**
 * @swagger
 *  components:
 *     schemas:
 *         User:
 *             type : object
 *             properties:
 *                  _id:
 *                     type: string
 *                  userName:
 *                     type: string
 *                  email:
 *                     type: string
 *                  password:
 *                     type: string
 */

/**
 * @swagger
 * /v1/auth/register:
 *    post:
 *       tags:
 *         - User:
 *       summary: API này dùng để đăng kí tài khoản người dùng 
 *       requestBody:
 *           required: true
 *           content: 
 *               application/json:
 *                   schema:
 *                       $ref : '#components/schemas/User'
 *       responses: 
 *             200:
 *                description: 
 *                content:
 *                   application/json:
 *                          schema:
 *                             type: array
 *                             items: 
 *                                 $ref : '#components/schemas/User'
 */
router.post('/register',authController.registerUser);
/**
 * @swagger
 * /v1/auth/login:
 *    post:
 *       tags:
 *         - User:
 *       summary: API này dùng để đăng nhập tài khoản người dùng 
 *       description : Nếu đăng nhập thành công sẽ vào trang chủ
 *       requestBody:
 *           required: true
 *           content: 
 *               application/json:
 *                   schema:
 *                       $ref : '#components/schemas/User'
 *       responses: 
 *             200:
 *                description: 
 *                content:
 *                   application/json:
 *                          schema:
 *                             type: array
 *                             items: 
 *                                 $ref : '#components/schemas/User'
 */
router.post('/login',authController.loginUser);
router.post("/refresh",authController.requestRefreshToken);
router.post("/logout", middlewareController.verifyToken ,authController.Logout);

module.exports = router;