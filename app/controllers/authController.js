
const UserModel = require('../models/user.model');
var jwt = require('jsonwebtoken');
var config = require('../config/env');


exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

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
          message : "error"
        });
    });
  };

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, repeat_password } = req.body;
    let isValid = false;

    if (!(email && password && username && repeat_password)) {
      return res.status(400).send({
          status : false,
          message : "All Fields are required"
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

    if(password != repeat_password){
      return res.status(409).send({
        status : false,
        message : "Passwords must be the same"
      });
    }

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
    return res.status(400).json({
      status : false,
      message : ""
  });
  }
}
