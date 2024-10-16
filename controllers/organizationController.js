const Organization = require('../models/OrganizationModel');


const getOrganization = async (req, res) => {
    try {
      if (req.params.id) {
        const organization = await Organization.findById(req.params.id);
  
        if (!organization) {
          return res.status(404).json({
            success: false,
            message: "Organization not found",
          });
        }
  
        return res.status(200).json({
          success: true,
          message: "Organization retrieved successfully",
          data: organization,
        });
      } else {
        const organizations = await Organization.find({});
  
        return res.status(200).json({
          success: true,
          message: "Organization retrieved successfully",
          data: organizations,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };





const createOrganization = async (req, res)=>{

    console.log(req.body)
    const {name, address} = req.body;

 try{

    const organization = await Organization.create({name, address})

    res.status(200).json({
        success: true,
        message: "organization controller called",
        data: organization
    })
 }catch(err){
    res.status(400).json({
        success: false,
        message: "organization controller called",
        data: err
    })
 }  
 
}

const updateOrganization = async (req, res) => {
    const { id } = req.params;
    const {name, address} = req.body;

    try {
        const organization = await Organization.findByIdAndUpdate(
            id,
            { name, address},
            { new: true }
        );

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Organization updated successfully",
            data: organization
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to update organization",
            error: err.message
        });
    }
};

const deleteOrganization = async (req, res) => {
    const { id } = req.params;

    try {
        const organization = await Organization.findByIdAndDelete(id);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Organization deleted successfully",
            data: organization
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to delete Organization",
            error: err.message
        });
    }
};

module.exports = {
    getOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization
}