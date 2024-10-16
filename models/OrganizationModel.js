const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organizationSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address: [
        {
          area: {
            type: String,
            required: true,
            trim: true,
          },
          postalCode: {
            type: String,
            required: true,
            trim: true,
          },
          // branchName: {
          //   type: String,
          //   required: true,
          //   trim: true,
          // },

        },
      ],
},
{
    timestamps: true,
  }

);

module.exports = mongoose.model("Organization", organizationSchema);