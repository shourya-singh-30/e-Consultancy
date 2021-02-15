/**
 * @description Express router for provider specifc data.
 * @author Jithin Zacharia
 */

const router = require('express').Router();
const  getProviderController = require('../controllers/provider/getProvidersController');
const getProviderCityController = require('../controllers/provider/getProviderDetailsByCityController')
const getProviderDetailsController = require('../controllers/provider/getProviderDetailsController');
const getProviderUpdateController= require('../controllers/provider/getProviderUpdateController');
JWTCertifier = require('../helpers/JWTCertifier');

router.get('/all', getProviderController.getAllProvider);
router.get('/city/:city',getProviderCityController.getProviderDetailsByCity)
router.put('/viewers', getProviderController.getViewers);
router.get('/pro/login',JWTCertifier.verifyJWT,getProviderDetailsController.getProviderDetail)
router.get('/:partnerId',getProviderDetailsController.getProviderDetails)
router.put('/update/service/:pid',getProviderDetailsController.updateProviderService)
router.put('/update/expertise/:pid',getProviderDetailsController.updateProviderExpertise)
router.put('/update',getProviderUpdateController.getProviderUpdate)
module.exports = router;
