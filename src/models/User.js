import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 username:{
    type:String,
    required:true,
    unique:true
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 passwordHash:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:["admin", "poster"] ,
    default:"poster"
}
,
category:String, // e.g., "Medical Center", "Student Union"
status:{
    type:String,
    enum:["pending", "active", "rejected"],
    default:"pending"
},
profilePicture:String}, // URL to the profile picture
{timestamps:true}
)


export default mongoose.models.User || mongoose.model("User", userSchema);


