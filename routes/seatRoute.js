const express = require('express');
const mongoose = require('mongoose');
const Seat = require('../models/SeatModel');
const { getSeats, createSeat, updateSeat, deleteSeat } = require('../controllers/seatController');

const router = express.Router();

// router.get('/get-seat/:id', getSeats);
router.get('/get-seat', getSeats);

router.get('/get-seat', async (req, res) => {
    try {
      const hallId = req.query.hall; // Get hall ID from query parameters
  
      // Validate hall ID
      if (!mongoose.Types.ObjectId.isValid(hallId)) {
        return res.status(400).json({ success: false, message: 'Invalid hall ID' });
      }
  
      // Find seats for the given hall
      const seats = await Seat.find({ hall: hallId });
      
      res.json({ success: true, data: seats });
    } catch (error) {
      console.error(`Error fetching seats: ${error.message}`);
      res.status(500).json({ success: false, message: 'Error fetching seats', error: error.message });
    }
  });

router.post('/create', createSeat);

router.put('/update/:id', updateSeat);
router.delete('/delete/:id', deleteSeat);
router.delete('/delete', deleteSeat);

module.exports = router;
