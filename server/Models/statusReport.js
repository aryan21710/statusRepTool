const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const reqdTrimSchema = {
  type: String,
  required: true,
  trim: true,
  unique: false,
};

const signInEmailSchema = {
  type: ObjectId,
  ref: "UserCredModel",
  required: true,
};

const statusSchema=mongoose.Schema({
    userIdForBackend: signInEmailSchema,
    date: reqdTrimSchema,
    category: reqdTrimSchema,
    status: reqdTrimSchema,

}, { timestamps: true }
)

module.exports= mongoose.model("StatusModel", statusSchema)