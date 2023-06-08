const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
required:true,
type:String,
  },
})

module.exports= mongoose.model("Users" , userSchema);