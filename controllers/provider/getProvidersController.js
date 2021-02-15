/**
 * @fileoverview Controller for getting all the providers
 * @author Jithin Zacharia
 */

const provideModel = require('../../model/providerModel');
const userModel = require('../../model/userModel');
exports.getAllProvider = (req, res) => {
    provideModel.find((err, providers)=> {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(providers);
        }
    })
}

exports.getViewers=(req,res)=>{
    console.log("hiiiii2")
    userModel.updateOne({ userId: req.body.userId.id }, {$push:{viewed: req.body.provider}}, (err,user) => {
        if(err){
            res.status(400).json(err);
        }else{
            console.log("Viewed array updated");
        }
    })
    provideModel.updateOne({ partnerId: req.body.partnerId },{$push:{viewers:req.body.userId}}, (err, provider) => {
        if (err) {
            res.status(400).json(err);
        } else {
            console.log(provider.viewers);
        }
    })
    
}