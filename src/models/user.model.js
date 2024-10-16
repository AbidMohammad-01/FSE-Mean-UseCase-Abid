const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
lastname:{
    type:String,
    required:true
},
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resettoken:{
        type:String,
        
    },
    
    
})

const User = mongoose.model('user',userSchema)


module.exports ={User}