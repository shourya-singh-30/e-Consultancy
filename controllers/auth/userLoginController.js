/**
 * @description Controller for logging an existing user
 * @author Jithin Zacharia
 */

const userModel = require('../../model/userModel'),
    JWTCertifier = require('../../helpers/JWTCertifier'),
    passwordValidator = require('../../helpers/passwordValidations');

exports.userLogin = (req, res) => {
    userModel.find({email: req.body.email, role: req.body.role}, (err, user)=>{
        if(err) {
            res.status(400).json(err);
        } else {
            if(user.length==0) {
                res.status(400).json("User does not exits. Please enter correct credentials.");
            } else if(passwordValidator.comparePassword(
                req.body.password,
                user[0].password
            ) === false) {
                res.status(401).json("Passwords does not match");
            } else {
                // console.log(user[0],"kkkk");
                let token = JWTCertifier.generateJWT(
                    user[0].email,
                    user[0].name,
                    1
                )
                res.status(200).json({
                    token,
                    status: true,
                    name:user[0].name,
                    userId:user[0].userId
                })
            }
        }
    })
}