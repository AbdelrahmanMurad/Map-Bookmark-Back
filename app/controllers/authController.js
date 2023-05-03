
const UserMode = require('../models/user.model');


exports.login = (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    UserMode.find({
        "username" : username,
        "password" : password
    })
    .then(data => {
      if (!data){
        res.status(200).json({
            message: "user found successfully"
        });
      }
      else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
        res.status(200).json({
            message: "error"
        });
    });

    // res.status(200).json({
    //     message: "Welcome to the back"
    // });
  };
  