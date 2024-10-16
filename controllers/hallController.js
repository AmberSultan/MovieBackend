const Hall = require('../models/HallModel');


const getHall = async (req, res) => {
  try {
    // Check if `id` parameter is provided for fetching a specific hall
    if (req.params.id) {
      const hall = await Hall.findById(req.params.id);
  
      if (!hall) {
        return res.status(404).json({
          success: false,
          message: "Hall not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Hall retrieved successfully",
        data: hall,
      });
    } 
    
    // Check if `branch` query parameter is provided for fetching halls by branch
    const branchId = req.query.branch;
    if (branchId) {
      const halls = await Hall.find({ branch: branchId });
      return res.status(200).json({
        success: true,
        message: "Halls retrieved successfully",
        data: halls,
      });
    }
    
    // Fetch all halls if no `id` or `branch` parameter is provided
    const halls = await Hall.find({});
    return res.status(200).json({
      success: true,
      message: "Halls retrieved successfully",
      data: halls,
    });
    
  } catch (error) {
    console.error('Error fetching halls:', error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


const createHall = async (req, res) => {
    try {
      const halls = req.body.halls;
      const createdHalls = await Hall.insertMany(halls);
      res.status(201).json({ success: true, data: createdHalls });
    } catch (error) {
      res.status(400).json({ success: false, message: "Error creating halls", data: error.message });
    }
  };
  


const updateHall = async (req, res) => {
    const { id } = req.params;
    const {hallname, capacity, branch,organization }= req.body;

    try {
        const hall = await Hall.findByIdAndUpdate(
            id,
            { hallname, capacity, branch, organization},
            { new: true }
        );

        if (!hall) {
            return res.status(404).json({
                success: false,
                message: "hall not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "hall updated successfully",
            data: hall
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to update hall",
            error: err.message
        });
    }
};

const deleteHall = async (req, res) => {
    const { id } = req.params;

    try {
        const hall = await Hall.findByIdAndDelete(id);

        if (!hall) {
            return res.status(404).json({
                success: false,
                message: "hall not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "hall deleted successfully",
            data: hall
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to delete hall",
            error: err.message
        });
    }
};


module.exports = {
    getHall,
    createHall,
    updateHall,
    deleteHall
}

