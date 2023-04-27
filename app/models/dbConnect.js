const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/map', 
{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => { // Successfully connected
    // console.log(result);
  })
  .catch((err) => {
    // Catch any potential error
    console.log(mongoose.version);
    console.log("Unable to connect to MongoDB. Error: " + err);
  });
