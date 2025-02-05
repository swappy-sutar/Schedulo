import { Candidate } from "../../Models/candidate.model.js";
import { Client } from "../../Models/client.model.js";

const createCandidate = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      address,
      phoneNumber,
      currentJobRole,
      currentCompany,
      experience,
      skills,
      clientId,
      currentCTC,
      noticePeriod,
      findOn,
      status,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !address ||
      !phoneNumber ||
      !currentJobRole ||
      !currentCompany ||
      !findOn

    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    const isClientExist = await Client.findById(clientId);

    if (!isClientExist) {
      return res.status(404).json({
        success: false,
        message: "Client not found with this client-id",
      });
    }

    const createCandidate = await Candidate.create({
      firstname,
      lastname,
      email,
      address,
      phoneNumber,
      currentJobRole,
      currentCompany,
      experience,
      skills,
      client: clientId,
      currentCTC,
      noticePeriod,
      findOn,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Candidate Created successfully",
      data: createCandidate,
    });

  } catch (error) {
    console.error("Error while creating candidate:", error);
    return res.status(500).json({
      success: false,
      message: "Error while creating candidate",
    });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const {
      candidateId,
      firstname,
      lastname,
      email,
      address,
      phoneNumber,
      currentJobRole,
      currentCompany,
      experience,
      skills,
      clientId,
      currentCTC,
      noticePeriod,
      findOn,
      status,
    } = req.body;

    // Find the candidate by ID
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found with this candidate-id",
      });
    }

    if (clientId) {
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client not found with this client-id",
        });
      }
      candidate.client = clientId; 
    }

    // Manually updating only provided fields
    if (firstname) candidate.firstname = firstname;
    if (lastname) candidate.lastname = lastname;
    if (email) candidate.email = email;
    if (address) candidate.address = address;
    if (phoneNumber) candidate.phoneNumber = phoneNumber;
    if (currentJobRole) candidate.currentJobRole = currentJobRole;
    if (currentCompany) candidate.currentCompany = currentCompany;
    if (experience) candidate.experience = experience;
    if (skills) candidate.skills = skills;
    if (currentCTC) candidate.currentCTC = currentCTC;
    if (noticePeriod) candidate.noticePeriod = noticePeriod;
    if (findOn) candidate.findOn = findOn;
    if (status) candidate.status = status;

    // Save updated candidate
    const updatedCandidate = await candidate.save();

    return res.status(200).json({
      success: true,
      message: "Candidate updated successfully",
      data: updatedCandidate,
    });
  } catch (error) {
    console.error("Error while updating candidate:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating candidate",
    });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    
  } catch (error) {
    console.error("Error while deleting candidate:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting candidate",
      });
  }
};

const getCandidate = async (req, res) => {
  try {
    
  } catch (error) {
    console.error("Error while getting candidate:", error);
    return res.status(500).json({
      success: false,
      message: "Error while getting candidate",
      });
    
  }
};

export { createCandidate, updateCandidate, deleteCandidate, getCandidate };
