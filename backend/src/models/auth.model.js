import mongoose from "mongoose";
import bcrypt from "bcrypt";
const authSchema = new mongoose.Schema({
    name:{
    type: String,
    required: [ true, "Please provide a name"],
    unique: true
    },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"]
  }
},{
    timestamps: true
});

authSchema.pre("save", function(){
    if(!this.isModified("password")){
        return ;
    }
this.password = bcrypt.hashSync(this.password, 10);
})

authSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const authModel = mongoose.model("Auths", authSchema);
export default authModel;