
const FavoriteModel = require('../models/favorite.model');

const Joi = require('joi');

exports.store = async (req, res, next) => {
  try {
    const { username, lat, long} = req.body;
    let isValid = false;

    const schema = Joi.object({
      username: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
        lat: Joi.string()      
          .required(),
        long: Joi.string()      
          .required(),
  });
  const { error, value } = schema.validate({ username: username, lat: lat, long:long });

  if(error){
    return res.status(400).json({
      status : false,
      message : error.details[0].message
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