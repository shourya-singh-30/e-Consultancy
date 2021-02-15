const providerModel = require("../../model/providerModel");
const nameExtractor = require("../../helpers/generatePartnerId");
const passwordValidator = require("../../helpers/passwordValidations");

exports.getProviderUpdate = (req, res) => {
  providerModel.find({ partnerId: req.body.provider_id }, (err, users) => {
    // console.log(users);
    if (err) {
      res.status(400).json(err);
    } else if (!users.length) {
      res.status(400).json("provider not found. Please register to continue");
    } else if (users.length) {
      if (users[0].email == req.body.email) {
        if (req.body.password != "") {
          providerModel.findOneAndUpdate(
            { partnerId: req.body.provider_id },
            {
              $set: {
                email: req.body.email,
                fullName: req.body.name,
                mobileNumber: req.body.phone_number,
                password: passwordValidator.generatePasswordHash(
                  req.body.password
                ),
                providerIdentityImg: req.body.providerImg,
                partnerId: nameExtractor.getPartnerId(
                  req.body.name,
                  req.body.phone_number
                ),
                // country: req.body.country,
                // photo: req.body.photo
              },
            },
            (error, newUser) => {
              if (error) {
                res.status(400).json(error);
              } else {
                providerModel.find({ email: req.body.email }, (err, users2) => {
                  if (users2.length) {
                    console.log(users2[0].fullName, users2[0].partnerId);
                  } else {
                    console.log("no");
                  }
                  let token = JWTCertifier.generateJWT(
                    users2[0].email,
                    users2[0].fullName,
                    2
                  );
                  res.status(200).json({
                    message: "Profile successfully updated.",
                    token,
                    name: users2[0].fullName,
                    partnerId: users2[0].partnerId,
                  });
                });
              }
            }
          );
        } else {
          providerModel.findOneAndUpdate(
            { partnerId: req.body.provider_id },
            {
              $set: {
                email: req.body.email,
                fullName: req.body.name,
                mobileNumber: req.body.phone_number,
                providerIdentityImg: req.body.providerImg,
                partnerId: nameExtractor.getPartnerId(
                  req.body.name,
                  req.body.phone_number
                ),
                // country: req.body.country,
                // photo: req.body.photo
              },
            },
            (error, newUser) => {
              if (error) {
                res.status(400).json(error);
              } else {
                providerModel.find({ email: req.body.email }, (err, users2) => {
                  if (users2.length) {
                    console.log(users2[0].fullName, users2[0].partnerId);
                  } else {
                    console.log("no");
                  }
                  let token = JWTCertifier.generateJWT(
                    users2[0].email,
                    users2[0].fullName,
                    2
                  );
                  res.status(200).json({
                    message: "Profile successfully updated.",
                    token,
                    name: users2[0].fullName,
                    partnerId: users2[0].partnerId,
                  });
                });
              }
            }
          );
        }
      } else {
        providerModel.find({ email: req.body.email }, (err, users1) => {
          if (err) {
            res.status(400).json(err);
          } else if (users1.length) {
            res.status(200).json("EMAIL ID already exist");
          } else {
            if (req.body.password != "") {
              providerModel.findOneAndUpdate(
                { partnerId: req.body.provider_id },
                {
                  $set: {
                    email: req.body.email,
                    fullName: req.body.name,
                    mobileNumber: req.body.phone_number,
                    password: passwordValidator.generatePasswordHash(
                      req.body.password
                    ),
                    providerIdentityImg: req.body.providerImg,
                    partnerId: nameExtractor.getPartnerId(
                      req.body.name,
                      req.body.phone_number
                    ),
                    // country: req.body.country,
                    // photo: req.body.photo
                  },
                },
                (error, newUser) => {
                  if (error) {
                    res.status(400).json(error);
                  } else {
                    providerModel.find(
                      { email: req.body.email },
                      (err, users2) => {
                        if (users2.length) {
                          // console.log(users2);
                        } else {
                          console.log("no");
                        }
                        let token = JWTCertifier.generateJWT(
                          users2[0].email,
                          users2[0].fullName,
                          2
                        );
                        res.status(200).json({
                          message: "Profile successfully updated.",
                          token,
                          name: users2[0].fullName,
                          partnerId: users2[0].partnerId,
                        });
                      }
                    );
                  }
                }
              );
            } else {
              providerModel.findOneAndUpdate(
                { partnerId: req.body.provider_id },
                {
                  $set: {
                    email: req.body.email,
                    fullName: req.body.name,
                    mobileNumber: req.body.phone_number,
                    providerIdentityImg: req.body.providerImg,
                    partnerId: nameExtractor.getPartnerId(
                      req.body.name,
                      req.body.phone_number
                    ),
                    // country: req.body.country,
                    // photo: req.body.photo
                  },
                },
                (error, newUser) => {
                  if (error) {
                    res.status(400).json(error);
                  } else {
                    providerModel.find(
                      { email: req.body.email },
                      (err, users2) => {
                        if (users2.length) {
                          // console.log(users2);
                        } else {
                          console.log("no");
                        }
                        let token = JWTCertifier.generateJWT(
                          users2[0].email,
                          users2[0].fullName,
                          2
                        );
                        res.status(200).json({
                          message: "Profile successfully updated.",
                          token,
                          name: users2[0].fullName,
                          partnerId: users2[0].partnerId,
                        });
                      }
                    );
                  }
                }
              );
            }
          }
        });
      }
    }
  });
};
