import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token required"],
        unique:true
    }
},{
    timestamps:true
})


const blacklistModel = mongoose.model("blackListToken",blacklistSchema)


export default blacklistModel