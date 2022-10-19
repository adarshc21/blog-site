const { Schema, model, default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: [3, "name should be atleast 8 charaters"],
    maxLength: [30, "name cannot exceed 30 charaters"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username is not available"],
    minLength: [3, "username atleast 3 charaters"],
    maxLength: [30, "username cannot exceed 30 charaters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validate: [validator.isEmail, "invalid email"],
    unique: [true, "email already exist"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "password should be atleast 8 charaters"],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  passwordResetToken: {type:String},
  passwordResetTokenExpires: {type:Date}
});

// hash password before save
UserSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

// generate jwt token
UserSchema.methods.getJwtToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// compare password
UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}


module.exports = model("User", UserSchema);
