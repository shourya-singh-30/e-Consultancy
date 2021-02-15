/**
 * @description Router for all user related API
 * @author Jithin Zacharia
 */

const router = require('express').Router(),
    JWTCertifier = require('../helpers/JWTCertifier'),
    validatorMiddleware = require('../validator/middleware'),
    userUpdateSchema = require('../validator/updateUserSchema'),
    getAllUserByIdController = require('../controllers/user/getAllUserByIdContoller'),
    getAllUserController = require('../controllers/user/getAllUserController'),
    getAllUserByRoleController = require('../controllers/user/getUsersByRoleController'),
    updateUserController = require('../controllers/user/updateUserController'),
    getUserDetailsController = require('../controllers/user/getUserDetailsController');

router.get('/all', JWTCertifier.verifyJWT, getAllUserController.getAllUsers);
router.get('/role/:role', JWTCertifier.verifyJWT, getAllUserByRoleController.getUserByRole)
router.get('/details', JWTCertifier.verifyJWT, getUserDetailsController.getUserDetails);
router.put('/userdata',getAllUserByIdController.getUser);
router.get('/details/:id', JWTCertifier.verifyJWT, getAllUserByIdController.getUserById);
router.put('/update', JWTCertifier.verifyJWT, validatorMiddleware(userUpdateSchema), updateUserController.updateUser);
//
module.exports = router;