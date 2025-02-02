import { Client } from "../../Models/client.model.js";
import { JobRequirement } from "../../Models/jobRequirements.model.js";

const createJobRequirements = async (req, res) => {
  try {
    const {
      clientId,
      title,
      experience,
      salaryRange,
      description,
      status,
      remark,
    } = req.body;

    if (!clientId || !title || !experience || !salaryRange || !status) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const isValidClient = await Client.findById(clientId);

    if (!isValidClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found with this client id",
      });
    }

    const newJobRequirement = await JobRequirement.create({
      clientId,
      title,
      experience,
      salaryRange,
      description,
      status,
      remark,
    });

    await Client.findByIdAndUpdate(clientId, {
      $push: { jobRequirements: newJobRequirement._id },
    });

    return res.status(201).json({
      success: true,
      message: "Job requirement created successfully",
      data: newJobRequirement,
    });
  } catch (error) {
    console.error("Error while creating job requirement:", error);
    return res.status(500).json({
      success: false,
      message: "Error while creating job requirement",
    });
  }
};

const updateJobRequirements = async (req, res) => {
  try {
    const {
      jobRequirementId,
      title,
      experience,
      salaryRange,
      description,
      status,
      remark,
    } = req.body;

    if (!jobRequirementId) {
      return res.status(400).json({
        success: false,
        message: "Job requirement ID is required",
      });
    }

    if (
      !title &&
      !experience &&
      !salaryRange &&
      !description &&
      !status &&
      !remark
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update",
      });
    }

    const jobRequirement = await JobRequirement.findById(jobRequirementId);
    console.log("jobRequirement", jobRequirement);

    if (!jobRequirement) {
      return res.status(404).json({
        success: false,
        message: "Job requirement not found",
      });
    }

    if (title) jobRequirement.title = title;
    if (experience) jobRequirement.experience = experience;
    if (salaryRange) jobRequirement.salaryRange = salaryRange;
    if (description) jobRequirement.description = description;
    if (status) jobRequirement.status = status;
    if (remark) jobRequirement.remark = remark;

    const updatedJobReq = await jobRequirement.save();

    return res.status(200).json({
      success: true,
      message: "Job requirement updated successfully",
      data: updatedJobReq,
    });
  } catch (error) {
    console.error("Error while updating job requirement:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating job requirement",
    });
  }
};

const deleteJobRequirements = async (req, res) => {
  try {
    const { jobRequirementId } = req.body;

    if (!jobRequirementId) {
      return res.status(400).json({
        success: false,
        message: "Job requirement ID is required",
      });
    }

    const deletedJobReq = await JobRequirement.findById(jobRequirementId);

    if (!deletedJobReq) {
      return res.status(404).json({
        success: false,
        message: "Job requirement not found",
      });
    }

    await Client.findByIdAndUpdate(deletedJobReq.clientId, {
      $pull: { jobRequirements: jobRequirementId },
    });

    await JobRequirement.findByIdAndDelete(jobRequirementId);

    return res.status(200).json({
      success: true,
      message: "Job requirement deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting job requirement:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting job requirement",
    });
  }
};


const getJobRequirements = async (req, res) => {
  try {
    const jobRequirements = await JobRequirement.find();

    if (jobRequirements.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No job requirements found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job requirements fetched successfully",
      data: jobRequirements,
    });
  } catch (error) {
    console.error("Error while getting job requirements:", error);
    return res.status(500).json({
      success: false,
      message: "Error while getting job requirements",
    });
  }
};

const getActiveJobRequirements = async (req, res) => {
  try {
    const jobRequirements = await JobRequirement.find({ status: "Open" });

    if (jobRequirements.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active job requirements found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Active job requirements fetched successfully",
      data: jobRequirements,
    });
  } catch (error) {
    console.error("Error while getting active job requirements:", error);
    return res.status(500).json({
      success: false,
      message: "Error while getting active job requirements",
    });
  }
};

export {
  createJobRequirements,
  updateJobRequirements,
  deleteJobRequirements,
  getJobRequirements,
  getActiveJobRequirements,
};
