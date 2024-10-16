const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    trailer:{
      type: String,
    },
    schedule: [
      {
        date: {
          type: String,
          required: true,
        },
        showtiming:
          {
            type: String, // Format like "14:00" for 2 PM
            required: true,
          },
      },
    ],
    thumbnail: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
