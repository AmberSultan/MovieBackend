const Branch = require('../models/BranchModel');




// const getBranch = async (req, res) => {
//     try {
//       if (req.params.id) {
//         const branch = await Branch.findById(req.params.id);
  
//         if (!branch) {
//           return res.status(404).json({
//             success: false,
//             message: "Branch not found",
//           });
//         }
  
//         return res.status(200).json({
//           success: true,
//           message: "Branch retrieved successfully",
//           data: branch,
//         });
//       } else {
//         const branches = await Branch.find({});
  
//         return res.status(200).json({
//           success: true,
//           message: "Branch retrieved successfully",
//           data: branches,
//         });
//       }
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//         error: error.message,
//       });
//     }
//   };


const getBranch = async (req, res) => {
  try {
    // Fetch branches by organization ID if provided
    const organizationId = req.query.organization;
    if (organizationId) {
      const branches = await Branch.find({ organization: organizationId });
      return res.status(200).json({
        success: true,
        message: "Branches retrieved successfully",
        data: branches,
      });
    }

    // Fetch a specific branch if ID is provided
    if (req.params.id) {
      const branch = await Branch.findById(req.params.id);
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: "Branch not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Branch retrieved successfully",
        data: branch,
      });
    }

    // Fetch all branches if no query or ID parameter is provided
    const branches = await Branch.find({});
    return res.status(200).json({
      success: true,
      message: "Branches retrieved successfully",
      data: branches,
    });
  } catch (error) {
    console.error('Error fetching branches:', error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


const createBranch = async (req, res)=>{

    console.log(req.body)
    const {branchname, phoneNumber, email, city, openingTime, closingTime, noOfHalls, organization} = req.body

 try{
    const branch = await Branch.create({branchname, phoneNumber, email, city, openingTime, closingTime, noOfHalls, organization})

    res.status(200).json({
        success: true,
        message: "branch controller called",
        data: branch
    })
 }catch(err){
    res.status(400).json({
        success: false,
        message: "branch controller called",
        data: err
    })
 }  
 
}

const updateBranch = async (req, res) => {
    const { id } = req.params;
    const {branchname, phoneNumber, email, city, openingTime, closingTime, noOfHalls, organization} = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { branchname, phoneNumber, email, city, openingTime, closingTime, noOfHalls, organization},
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Branch not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Branch updated successfully",
            data: user
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to update user",
            error: err.message
        });
    }
}

const deleteBranch = async (req, res) => {
    const { id } = req.params;

    try {
        const branch = await Branch.findByIdAndDelete(id);

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Branch deleted successfully",
            data: user
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to delete Branch",
            error: err.message
        });
    }
}



module.exports = {
    getBranch,
    createBranch,
    updateBranch,
    deleteBranch
}