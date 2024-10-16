const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const seatSchema = new Schema(
  {
    seatNumber: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
    price: {
      type: Number,
      required: true,
    },
    hall: {
      type: Schema.Types.ObjectId,
      ref: "Hall",
    },
    bookingDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to set the bookingDate if the status is booked
seatSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'booked' && !this.bookingDate) {
    this.bookingDate = new Date(); // Set current date
  }
  next();
});

module.exports = mongoose.model("Seat", seatSchema);
