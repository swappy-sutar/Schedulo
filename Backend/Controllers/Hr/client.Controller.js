import { Client } from "../../Models/client.model.js";
import { User } from "../../Models/user.model.js";
import { JobRequirement } from "../../Models/jobRequirements.model.js";

const createClient = async (req, res) => {
  try {
    const {
      companyName,
      companyLocation,
      companyBudget,
      hrName,
      hrEmail,
      HrPhoneNumber,
      coordinationHr,
      industry,
      requirementFrom,
    } = req.body;

    if (
      !companyName ||
      !companyLocation ||
      !companyBudget ||
      !hrName ||
      !hrEmail ||
      !HrPhoneNumber ||
      !coordinationHr ||
      !industry ||
      !requirementFrom
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    const Hr = await User.findById({ _id: coordinationHr }).select(
      " _id firstname lastname email"
    );

    const newClient = await Client.create({
      companyName,
      companyLocation,
      companyBudget,

      hrName,
      hrEmail,
      HrPhoneNumber,
      coordinationHr: Hr._id,
      industry,
      requirementFrom,
      ConfidentialData: {
        GSTNumber: "",
        PaymentTerm: 0,
        PlacementFeePercentage: 0,
        ReplacementTerm: 0,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Client created successfully",
      data: {
        id: newClient.id,
        companyName: newClient.companyName,
        companyLocation: newClient.companyLocation,
        companyBudget: newClient.companyBudget,
        hrName: newClient.hrName,
        hrEmail: newClient.hrEmail,
        HrPhoneNumber: newClient.HrPhoneNumber,
        industry: newClient.industry,
        requirementFrom: newClient.requirementFrom,
      },
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating client",
    });
  }
};

const getAllClientsDetailsForHr = async (req, res) => {
  try {
    const clientDetails = await Client.find()
      .select(
        "-ConfidentialData.GSTNumber -ConfidentialData.PaymentTerm -ConfidentialData.PlacementFeePercentage -ConfidentialData.ReplacementTerm"
      )
      .populate({
        path: "coordinationHr",
        select: " _id firstname lastname email",
      })
      .populate("jobRequirements");

    if (!clientDetails || clientDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No client details found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Clients details fetched successfully",
      data: clientDetails,
    });
  } catch (error) {
    console.error("Error fetching client details:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching client details",
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const {
      clientId,
      companyName,
      companyLocation,
      companyBudget,
      jobRequirement,
      hrName,
      hrEmail,
      HrPhoneNumber,
      coordinationHr,
      industry,
      requirementFrom,
      GSTNumber,
      PaymentTerm,
      PlacementFeePercentage,
      ReplacementTerm,
    } = req.body;

    const client = await Client.findOne({ _id: clientId });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    if (
      !companyName &&
      !companyLocation &&
      !companyBudget &&
      !jobRequirement &&
      !hrName &&
      !hrEmail &&
      !HrPhoneNumber &&
      !coordinationHr &&
      !industry &&
      !requirementFrom &&
      !GSTNumber &&
      !PaymentTerm &&
      !PlacementFeePercentage &&
      !ReplacementTerm
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });
    }

    if (coordinationHr) {
      const Hr = await User.findById(coordinationHr).select(
        "_id firstname lastname email"
      );
      if (!Hr) {
        return res.status(404).json({
          success: false,
          message: "HR not found",
        });
      }
      client.coordinationHr = Hr._id;
    }

    if (companyName) client.companyName = companyName;
    if (companyLocation) client.companyLocation = companyLocation;
    if (companyBudget) client.companyBudget = companyBudget;
    if (jobRequirement) client.jobRequirements = jobRequirement;
    if (hrName) client.hrName = hrName;
    if (hrEmail) client.hrEmail = hrEmail;
    if (HrPhoneNumber) client.HrPhoneNumber = HrPhoneNumber;
    if (industry) client.industry = industry;
    if (requirementFrom) client.requirementFrom = requirementFrom;

    if (GSTNumber || PaymentTerm || PlacementFeePercentage || ReplacementTerm) {
      client.ConfidentialData = {
        GSTNumber: GSTNumber || client.ConfidentialData?.GSTNumber,
        PaymentTerm: PaymentTerm || client.ConfidentialData?.PaymentTerm,
        PlacementFeePercentage:
          PlacementFeePercentage ||
          client.ConfidentialData?.PlacementFeePercentage,
        ReplacementTerm:
          ReplacementTerm || client.ConfidentialData?.ReplacementTerm,
      };
    }

    const updatedClient = await client.save();

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: updatedClient,
    });
  } catch (error) {
    console.error("Error updating client:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating client",
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const {clientId} = req.body;

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    await JobRequirement.deleteMany({ clientId: client._id });

    await Client.findByIdAndDelete(clientId);

    return res.status(200).json({
      success: true,
      message: "Client and associated job requirements deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting client",
    });
  }
};

export { createClient, updateClient, deleteClient, getAllClientsDetailsForHr };
