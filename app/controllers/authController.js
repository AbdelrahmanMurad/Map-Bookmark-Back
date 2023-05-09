
const UserModel = require('../models/user.model');
var jwt = require('jsonwebtoken');
var config = require('../config/env');
const Joi = require('joi');


exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const schema = Joi.object({
      username: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
      password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .message("Pasword must be charchters and integers")
          .required(),
  });
  
  const { error, value } = schema.validate({ username: username, password: password });  

    UserModel.find({
        "username" : username,
        "password" : password
    })
    .then(data => {
      if (!data){
        res.status(400).json({
            message: "username not found successfully"
        });
      }
      else {
          const token = jwt.sign(
            {user_id: data._id},
            config.secret,
            {
              expiresIn: "2h",
            }
          );

          res.status(200).json({
            username : data[0].username,
            email : data[0].email,
            token : token
          });
      }
    })
    .catch(err => {
        res.status(200).json({
          status : false,
          message : error.details[0].message
        });
    });
  };

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, repeat_password } = req.body;
    let isValid = false;

    const schema = Joi.object({
      username: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
      email: Joi.string()
          .email()
          .required(),
      password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .message("Pasword must be charchters and integers")
          .required(),
      repeat_password: Joi.any().equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' })
  });
  
  const { error, value } = schema.validate({ username: username, password: password, email:email, repeat_password:repeat_password });

  if(error){
    return res.status(400).json({
      status : false,
      message : error.details[0].message
    });
  }

  await UserModel.find({ "email":email })
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
      const user =  UserModel.create({
        username,
        email: email.toLowerCase(), 
        password: password,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        config.secret,
        {
          expiresIn: "2h",
        }
      );
  
      res.status(200).json({
        username : user.username,
        email : user.email,
        token : token
      });
    }else{
      return res.status(409).send({
        status : false,
        message : "User Already Exist. Please Login"
      });
    }
    
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status : false,
      message : ""
  });
  }
}
