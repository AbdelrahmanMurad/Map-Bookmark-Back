const express = require('express')
const cors = require('cors')
const app = express();
const auth = require("../controllers/authController.js");
const favorite = require("../controllers/favoriteController.js");
app.use(express.json())


app.use(cors());

// route
app.get('/', (req, res, next) => {

    res.status(200).json({
        message: "Welcome to the home"
    });
})

app.post('/login2', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: "Welcome to the home"
    });
})

app.post('/login', auth.login);
app.post('/register', auth.register);
app.post('/addToFavorite', favorite.store);
app.post('/favoriteList', favorite.list);


module.exports = app