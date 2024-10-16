const express = require('express');
const mongoose = require('mongoose');
const Hall = require('../models/HallModel');
const { getHall, createHall, updateHall, deleteHall } = require('../controllers/hallController');

const router = express.Router();

router.get('/get-hall', getHall);

// this is used to fetch halls based on specific Id
router.get('/get-hall', async (req, res) => {
  try {
    const branchId = req.query.branch;
    console.log(`Branch ID from query: ${branchId}`);

    if (!mongoose.Types.ObjectId.isValid(branchId)) {
      return res.status(400).json({ success: false, message: 'Invalid branch ID' });
    }

    const halls = await Hall.find({ branch: branchId });
    console.log(`Found Halls: ${JSON.stringify(halls)}`);

    res.json({ success: true, data: halls });
  } catch (error) {
    console.error(`Error fetching halls: ${error.message}`);
    res.status(500).json({ success: false, message: 'Error fetching halls', error: error.message });
  }
});

router.post('/create', createHall);
router.put('/update/:id', updateHall);
router.delete('/delete/:id', deleteHall);

module.exports = router;
