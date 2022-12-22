const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');

const router = require('express').Router();

router.get('/',middlewareController.verifyToken,userController.getAllUsers);
router.get('/getuser/',userController.getAllUsers);
router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,userController.deleteUser);
router.put('/tangpost/',userController.tangPost);
router.put('/giampost/',userController.giamPost);
module.exports = router;