import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email : String,
    displayName : {type : String, default : "User"},
    password : String,
    UUID : String
})


export default mongoose.model('userInfo', userSchema)