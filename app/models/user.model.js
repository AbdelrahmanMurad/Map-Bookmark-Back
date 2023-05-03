// module.exports = mongoose => {
//     var schema = new mongoose.Schema(
//       {
//         username: String,
//         password: String,
//         email: String
//       },
//       { timestamps: true }
//     );
  
//     schema.method("toJSON", function() {
//       const { __v, _id, ...object } = this.toObject();
//       object.id = _id;
//       return object;
//     });
  
//     const user = mongoose.model("user", schema);
//     return user;
//   };

const mongoose = require('mongoose');
    
// Course Modal Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});
    
const User = mongoose.model('users', UserSchema);
    
// Exporting our model objects
module.exports = User
  