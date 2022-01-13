const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters!"]
    }, 
}, {timestamps: true})

    UserSchema.virtual("confirmPassword")
        .get(()=> this.confirmPassword)
        .set((value)=>this.confirmPassword = value)

    UserSchema.pre("validate", function(next){
        console.log("in validate");

        if(this.password !== this.confirmPassword){
            this.invalidate("confirmPassword", "Passwords must match");
            console.log("passwords did not match");
        }
        console.log(this.password, this.confirmPassword);

        next();
    })

    UserSchema.pre("save", function(next){
        console.log("pre save");

        bcrypt.hash(this.password, 10)
            .then((hashedPassword)=>{
                console.log("in hash")
                this.password = hashedPassword;
                next();
            })
    })

    const User = mongoose.model("User", UserSchema);

    module.exports = User;
