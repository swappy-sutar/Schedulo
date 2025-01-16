import { Timeslot } from "../Models/timeslot.model.js";
import { User } from "../Models/user.model.js";

const createTimeslot = async (req, res) => {
  try {
    const { startTime, endTime, title, description, candidateDetails } =
      req.body;

    if (
      !startTime ||
      !endTime ||
      !title ||
      !candidateDetails ||
      !candidateDetails.name ||
      !candidateDetails.email ||
      !candidateDetails.phone ||
      !candidateDetails.qualification ||
      !candidateDetails.experience
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const conflictingTimeslot = await Timeslot.findOne({
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: { $lt: startTime }, endTime: { $gt: endTime } },
      ],
    });

    if (conflictingTimeslot) {
      return res.status(400).json({
        success: false,
        message:
          "This timeslot conflicts with an existing one. Please choose another time.",
      });
    }

    const createdBy = req.user.id;

    const timeslot = await Timeslot.create({
      startTime,
      endTime,
      title,
      description,
      createdBy,
      candidateDetails,
    });

    const updatedInUser = await User.findByIdAndUpdate(
      createdBy,
      {
        $push: { timeslots: timeslot._id },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Timeslot created successfully",
      data: timeslot,
    });
  } catch (error) {
    console.error("Error while creating timeslot:", error);
    return res.status(500).json({
      success: false,
      message: "Error while creating timeslot",
    });
  }
};

const updateTimeslot = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, title, description, candidateDetails } =
      req.body;

    if (
      !id ||
      (!startTime && !endTime && !title && !description && !candidateDetails)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a task ID and at least one field to update.",
      });
    }

    const timeslot = await Timeslot.findById({ _id: id });

    if (!timeslot) {
      return res.status(404).json({
        success: false,
        message: "Timeslot not found.",
      });
    }

    const conflictingTimeslot = await Timeslot.findOne({
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: { $lt: startTime }, endTime: { $gt: endTime } },
      ],
      _id: { $ne: id },
    });

    if (conflictingTimeslot) {
      return res.status(400).json({
        success: false,
        message:
          "This timeslot conflicts with an existing one. Please choose another time.",
      });
    }

    if (startTime) timeslot.startTime = startTime;
    if (endTime) timeslot.endTime = endTime;
    if (title) timeslot.title = title;
    if (description) timeslot.description = description;
    if (candidateDetails) timeslot.candidateDetails = candidateDetails;

    const updatedSlot = await timeslot.save();

    return res.status(200).json({
      success: true,
      message: "Timeslot updated successfully.",
      data: updatedSlot,
    });
  } catch (error) {
    console.log("Error while updating timeslot:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating timeslot",
    });
  }
};

const deleteTimeslot = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Timeslot ID is required.",
      });
    }

    const timeslot = await Timeslot.findById(id);

    if (!timeslot) {
      return res.status(404).json({
        success: false,
        message: "Timeslot not found.",
      });
    }

    await timeslot.deleteOne();

    await User.findByIdAndUpdate(
      timeslot.createdBy,
      {
        $pull: { timeslots: timeslot._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Timeslot deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting timeslot:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting timeslot",
    });
  }
};

const getTimeslots = async (req, res) => {
  try {
    const timeslots = await Timeslot.find().populate(
      "createdBy",
      "firstName lastName email"
    );

    return res.status(200).json({
      success: true,
      message: "Timeslots retrieved successfully",
      data: timeslots,
    });
  } catch (error) {
    console.error("Error while getting timeslots:", error);
    return res.status(500).json({
      success: false,
      message: "Error while getting timeslots",
    });
  }
};

export { createTimeslot, getTimeslots, updateTimeslot, deleteTimeslot };
