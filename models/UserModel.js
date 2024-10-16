const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';



const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    fullname: {
      type: String,
      // required: true,
    },
    // avatar: {
    //   type: String,
    // },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "employee", "user"],
      default: "user",
    },
    // permissions: {
    //   type: String
   
    // },
    // department: {
    //   type: String,
    // },


    refreshToken:{
      type:String
    }

  },
  {
    timestamps: true,
  }
);


// userSchema.pre("save", function(next){
//   if(!this.isModified("password")) return next();
//   this.password = bcrypt.hash(this.password, 10)
//   next()
// })

// userSchema.methods.isPasswordCorrect = async function(password)
// {
//   return await bcrypt.compare(password, this.password)
// }







module.exports = mongoose.model("User", userSchema);
