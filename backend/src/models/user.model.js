import mongoose,{ Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true,
            minLength: 3,
            maxLength: 30
        },

        password:{
            type: String,
            required: true,
            minLength: 6,
            maxLength: 128
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true
        }
    },
    {
        timestamps:true
    }
)
// brefore saving the user, hash the password
userSchema.pre("save", async function(){
    console.log("Pre-save hook triggered");
    console.log("Password modified:", this.isModified("password"));
    if(!this.isModified("password")){
        console.log("Password not modified, skipping hash");
        //return;
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log("Password hashed successfully");
        //next();
    }catch(err){
        console.error("Error hashing password:", err);
        next(err);
    }
});

//compare password
userSchema.methods.comparePassword = async function(candidatePassword){
    console.log("comparePassword called");
    console.log("Type of this.password:", typeof this.password);
    console.log("Stored hash:", this.password);
    console.log("Candidate password:", candidatePassword);
    try{
        const result = await bcrypt.compare(candidatePassword, this.password);
        console.log("bcrypt.compare result:", result);
        return result;
    }catch(err){
        console.error("Error in comparePassword:", err);
        return false;
    }
}
export const User = mongoose.model("User", userSchema);