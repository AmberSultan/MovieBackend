const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: "Hall",
        required: true
    },
    seat: [{
        type: String,
        required: true
    }],
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    // },
    totalSeats: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
  
},
{
    timestamps: true,
});

module.exports = mongoose.model("Ticket", ticketSchema);
