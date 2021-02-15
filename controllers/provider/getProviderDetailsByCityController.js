/**
 * @fileoverview Controller for getting  provider by email
 * @author Jithin Zacharia
 */

const provideModel = require('../../model/providerModel');

exports.getProviderDetailsByCity = (req, res) => {
    
    provideModel.find({City:req.params.city}, (err, providers)=> {
        if(err) {
            res.status(400).json(err);
        } else {
            
            res.status(200).json(providers);
        }
    })
}