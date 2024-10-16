const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const branchSchema = new Schema({
    branchname: {
        // type: Schema.Types.ObjectId,
        // ref:"Organization",
        // required: true

        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city:{
        type: String,
        required: true,
    },
    // managerName: {
    //     type: String,
    //     required: false,
    // },
    openingTime: {
        type: String,
        required: true,
    },
    closingTime: {
        type: String,
        required: true,
    },
    // branchImage: {
    //     type: String,
    //     required: false,
    // }
    
    // halls: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Hall"
    // }]

    noOfHalls: {
        type: Number,
        required: true
    },
    organization:{
        type: Schema.Types.ObjectId,
        ref:"Organization",
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Branch", branchSchema);