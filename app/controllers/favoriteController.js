
const FavoriteModel = require('../models/favorite.model');

exports.store = async (req, res, next) => {
  try {
    const { username, lat, long} = req.body;
    let isValid = false;

    if (!(username && lat && long)) {
      return res.status(400).send({
          status : false,
          message : "All Fields are required"
      });
    }
    await FavoriteModel.find({ "username":username, "lat":lat, "long":long })
    .then(data => {
      if (data.length == 0){
        isValid = true; 
      }
    })
    .catch(err => {
        return res.status(200).json({
          message : "error"
        });
    });


    if(isValid){
      const user =  FavoriteModel.create({
        username,
        lat: lat, 
        long: long,
      });
  
      res.status(200).json({
          status : true,
          message : "Location has been added to favorite"
      });
    }else{
      return res.status(409).send({
        status : false,
        message : "this location has already been added to favorite"
      });
    }
    
  } catch (err) {
    throw err;
    return res.status(400).json({
      status : false,
      message : ""
  });
  }
}

exports.list = async (req, res, next) => {
  try {
    
    FavoriteModel.find({})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
        res.status(200).json({
          message : "error"
        });
    });
  } catch (err) {
    return res.status(400).json({
      status : false,
      message : ""
  });
  }
}