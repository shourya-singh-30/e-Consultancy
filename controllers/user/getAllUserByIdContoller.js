/**
 * @description Controller for getting a user by id
 * @author Jithin Zacharia
 */

const userModel = require('../../model/userModel');

exports.getUserById = (req, res) => {
    console.log(req.params.id);
    if(!req.params.id) {
        res.status(422).json("UserId is required. Please try again later.");
    } else {
        userModel.find({
            userId: req.params.id,
        }, (err, user) =>{ 
            if(err) {
                res.status(400).json(err);
            } else {
                if(!user.length) {
                    res.status(204).json("No user found.")
                } else {
                    res.status(200).json(user);
                }
            }
        })
    }
}
exports.getUser = (req,res) => {
    console.log(req.body.id);
    userModel.findOne({userId: req.body.id},(err,user)=>{
        if(err){
            res.status(400).json(err);
        }else{
            console.log("Here");
            res.status(200).json(user);
        }
    })
}