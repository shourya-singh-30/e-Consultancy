/**
 * @fileoverview Controller for getting all the providers
 * @author Jithin Zacharia
 */

const provideModel = require('../../model/providerModel');
const services = require('../../model/finanialServiceModel');
const expertise = require('../../model/businessTypeModel')
JWTCertifier = require('../../helpers/JWTCertifier');

exports.getProviderDetails = (req, res) => {

    provideModel.findOne({ partnerId: req.params.partnerId }, (err, providers) => {
        if (err) {
            res.status(400).json(err);
        } else {
            // console.log(req.params.partnerId, "yolo fetching partner id")
            // console.log(providers,req.params.partnerId,"yolo fetching partner id")
            res.status(200).json(providers);
        }
    })
}


exports.updateProviderService = (req, res) => {
    var flag = 0
    // console.log(req.body,req.params)
    provideModel.findOne({ partnerId: req.params.pid }, (err, prov) => {
        console.log(prov.servicesOffered)

        provideModel.update({ partnerId: req.params.pid }, { $pullAll: { servicesOffered: prov.servicesOffered } }, (err, provider) => {
            console.log(provider, 4344)
            if (provider.ok) {
                req.body.service.forEach(element => {
                    services.findOne({ name: element }, (err, ser) => {
                        console.log(ser)
                        provideModel.update({ partnerId: req.params.pid }, { $push: { servicesOffered: ser } }, (error, providers) => {
                            console.log(providers, 4344, err)
                            if (error) {

                                flag = 1;
                            }


                        })
                    })


                });

                if (flag == 0) {
                    // console.log("yes")
                    res.status(200).json("Successfully updated")

                }
            }
        })
    })
}





exports.updateProviderExpertise = (req, res) => {
    var flag = 0
    // console.log(req.body,req.params)
    provideModel.findOne({ partnerId: req.params.pid }, (err, prov) => {
        console.log(prov.servicesOffered)

        provideModel.update({ partnerId: req.params.pid }, { $pullAll: { partnerType: prov.partnerType } }, (err, provider) => {
            console.log(provider, 4344)
            if (provider.nModified) {
                req.body.expertise.forEach(element => {
                    expertise.findOne({ name: element }, (err, ser) => {
                        console.log(ser)
                        provideModel.update({ partnerId: req.params.pid }, { $push: { partnerType: ser } }, (error, providers) => {
                            console.log(providers, 4344, err)
                            if (error) {

                                flag = 1;
                            }


                        })
                    })


                });

                if (flag == 0) {
                    // console.log("yes")
                    res.status(200).json("Successfully updated")

                }
            }
        })
    })
}


exports.getProviderDetail = (req, res) => {
    // console.log(22, req.headers['x-api-key'])
    JWTCertifier.getTokenDecoded(req.headers['x-api-key']).then(user => {
        provideModel.find({ email: user.email }, (error, docs) => {
            if (error) {
                res.status(400).json(error)
            } else {
                // console.log(docs.partnerId, '11')
                res.status(200).json(docs.partnerId);
            }
        })
    })
}

