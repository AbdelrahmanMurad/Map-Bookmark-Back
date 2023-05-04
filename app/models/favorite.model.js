

const mongoose = require('mongoose');
    
const favoriteSchema = new mongoose.Schema({
    username: String,
    lat: String,
    long: String
});
    
const Favorite = mongoose.model('favorites', favoriteSchema);
    
module.exports = Favorite
  