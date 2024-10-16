const mongoose = require('mongoose');
const Seat = require('../models/SeatModel');
const Hall = require('../models/HallModel');

const getSeats = async (req, res) => {
  try {
    if (req.params.id) {
      // Fetch a specific seat by ID
      const seat = await Seat.findById(req.params.id).populate('hall');
      if (!seat) {
        return res.status(404).json({
          success: false,
          message: "Seat not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Seat retrieved successfully",
        data: seat,
      });
    } 
    
    // Check if `hall` query parameter is provided for fetching seats by hall
    const hallId = req.query.hall;
    if (hallId) {
      // Validate hall ID
      if (!mongoose.Types.ObjectId.isValid(hallId)) {
        return res.status(400).json({ success: false, message: 'Invalid hall ID' });
      }

      const seats = await Seat.find({ hall: hallId }).populate('hall');
      return res.status(200).json({
        success: true,
        message: "Seats retrieved successfully",
        data: seats,
      });
    }
    
    // Fetch all seats if no `id` or `hall` parameter is provided
    const seats = await Seat.find({}).populate('hall');
    return res.status(200).json({
      success: true,
      message: "Seats retrieved successfully",
      data: seats,
    });
    
  } catch (error) {
    console.error("Error fetching seats:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};




const createSeat = async (req, res) => {
  const { seatNumbers, hallId, price = 100 } = req.body;

  try {
    // Validate inputs
    if (!Array.isArray(seatNumbers) || seatNumbers.length === 0 || !hallId) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data. Ensure seatNumbers is an array and hallId is provided."
      });
    }

    // Fetch hall to get its capacity and layout
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({
        success: false,
        message: "Hall not found."
      });
    }

    // Get hall capacity and layout
    const totalSeats = hall.capacity;
    const rows = hall.rows || 10; // Default to 10 rows if not specified
    const seatsPerRow = hall.seatsPerRow || 10; // Default to 10 seats per row if not specified

    // Generate seat numbers in the format "A1, A2, B1, B2, ..."
    const allSeats = [];
    for (let row = 0; row < rows; row++) {
      const rowLabel = String.fromCharCode('A'.charCodeAt(0) + row);
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        // Break if we exceed total capacity
        if (allSeats.length >= totalSeats) break;
        allSeats.push(`${rowLabel}${seat}`);
      }
    }

    // Combine booked and available seats in linewise order
    const seats = allSeats.map(seatNumber => ({
      seatNumber,
      status: seatNumbers.includes(seatNumber) ? 'booked' : 'available',
      price,
      hall: hallId,
      bookingDate: seatNumbers.includes(seatNumber) ? new Date() : null // Set booking date for booked seats
    }));

    // Save all seats in one go
    const createdSeats = await Seat.insertMany(seats);

    res.status(200).json({
      success: true,
      message: "Seats created successfully",
      data: createdSeats
    });
  } catch (err) {
    console.error("Error creating seats:", err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Failed to create seats",
      error: err.message
    });
  }
};






// Update an existing seat by ID
const updateSeat = async (req, res) => {
  const { id } = req.params;
  const { seatNumber, status, price } = req.body;

  try {
    // Find the seat first to check its current status
    const seat = await Seat.findById(id);
    if (!seat) {
      return res.status(404).json({
        success: false,
        message: "Seat not found"
      });
    }

    // Update the seat's fields
    seat.seatNumber = seatNumber || seat.seatNumber;
    seat.price = price || seat.price;
    // Check if status is being changed to 'booked' and it wasn't booked before
    if (status === 'booked' && seat.status !== 'booked') {
      seat.status = status;
      seat.bookingDate = new Date(); // Set current date as booking date
    } else if (status) {
      seat.status = status;
    }

    // Save the updated seat
    const updatedSeat = await seat.save();

    res.status(200).json({
      success: true,
      message: "Seat updated successfully",
      data: updatedSeat
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update seat",
      error: err.message
    });
  }
};


// Delete a seat by ID
// const deleteSeat = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const seat = await Seat.findByIdAndDelete(id);

//         if (!seat) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Seat not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Seat deleted successfully",
//             data: seat
//         });
//     } catch (err) {
//         res.status(400).json({
//             success: false,
//             message: "Failed to delete seat",
//             error: err.message
//         });
//     }
// };

const deleteSeat = async (req, res) => {
  try {
      const result = await Seat.deleteMany(); // Deletes all documents in the Seat collection

      res.status(200).json({
          success: true,
          message: "All seats deleted successfully",
          data: result // Contains the result of the deletion (e.g., number of deleted documents)
      });
  } catch (err) {
      res.status(400).json({
          success: false,
          message: "Failed to delete all seats",
          error: err.message
      });
  }
};




module.exports = {
    getSeats,
    createSeat,
    updateSeat,
    deleteSeat
};
