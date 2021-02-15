/**
 * @description Controller for updating city details.
 */

const countryModel = require("../../model/countryModel");

exports.updateCity = (req, res) => {
  countryModel.find({ name: req.body.name }, (err, city) => {
    if (err) {
      res.status(400).json(err);
      console.log("error mein");
    } else {
      countryModel.find({ name: req.body.name }).then((doc) => {
        console.log("DOC !!!!!!   ", doc);
        let flag = 0;
        for (let cities of doc[0].cities) {
          if (cities.toLowerCase() === req.body.city.toLowerCase()) {
            flag = 1;
            break;
          } else {
            continue;
          }
        }
        if (flag == 0) {
          countryModel.findOneAndUpdate(
            { name: req.body.name },
            {
              $push: {
                cities: req.body.city,
              },
            },
            (error, updatedCity) => {
              if (error) {
                res.status(400).json(error);
              } else {
                res.status(200).json("City successfully updated.");
                // console.log("City added successfully");
              }
            }
          );
        } else {
          res.status(200).json("City already present");
        }
      });
      // console.log(req.body.name);
    }
    // const updatedCities = countryModel.find({ name: req.body.name });
    // if(updatedCities.length>0){
    //     console.log(updatedCities);
    // }else{
    //     console.log("Nothing Found");
    // }
  });
};
