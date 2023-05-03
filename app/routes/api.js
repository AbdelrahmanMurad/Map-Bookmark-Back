const express = require('express')
const app = express();
const auth = require("../controllers/authController.js");

// express.json()
// app.use(express.json())

// express.urlencoded()
// app.use(express.urlencoded())


// route
app.get('/', (req, res, next) => {

    res.status(200).json({
        message: "Welcome to the home"
    });
})

app.post('/login',auth.login)


module.exports = app