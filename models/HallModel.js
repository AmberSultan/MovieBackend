const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hallSchema = new Schema(
  {
    hallname: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hall", hallSchema);
