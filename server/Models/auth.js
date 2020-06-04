const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuidv1");

const trimReqdMaxltSchema = {
  type: String,
  required: true,
  maxlength: 32,
  trim: true
};

const uniqueReqdMaxltSchema = {
  type: String,
  required: true,
  maxlength: 32,
  unique: true
};

const reqdSchema = {
  type: String,
  required: true
};

const trimSchema = {
  type: String,
  trim: true
};

const userSchema = new mongoose.Schema(
  {
    name: trimReqdMaxltSchema,
    email: uniqueReqdMaxltSchema,
    hashed_password: reqdSchema,
    about: trimSchema,
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    history: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    this.newpassword = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptedPassword(password);
  })
  .get(function() {
    return this.newpassword;
  });

userSchema.methods = {
  authenticate: function(plainTextPasswd) {
    return this.encryptedPassword(plainTextPasswd) === this.hashed_password;
  },
  encryptedPassword: function(password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

// HERE THE NAME OF THE MODEL IS UserCredModel
module.exports = mongoose.model("UserCredModel", userSchema);