import Complaint from "../models/complaint.js";



export const createComplaint = async (req, res) => {
  try {
    console.log("Cloudinary File:", req.file); // Check the URL

    const { reasons, description, isTrue } = req.body;
    const filePath = req.file ? req.file.path : null; // ✅ Cloudinary URL

    const complaint = new Complaint({
      image: filePath,
      reasons: JSON.parse(reasons),
      description,
      isTrue: isTrue === "true",
    });

    const savedComplaint = await complaint.save();
    res
      .status(201)
      .json({ message: "Complaint submitted", data: savedComplaint });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit complaint", error });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ data: complaints });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch complaints", error });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ data: complaint });
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaint", error });
  }
};
