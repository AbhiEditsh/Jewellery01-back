const Inquiry = require("../models/ProductInquiry");

// Create a new inquiry
exports.createInquiry = async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, category, message } = req.body;

    const inquiry = new Inquiry({ firstname, lastname, email, mobile, category, message });
    const savedInquiry = await inquiry.save();

    res.status(201).json({ success: true, message: "Product Inquiry submitted successfully", data: savedInquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to submit inquiry", error: error.message });
  }
};

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch inquiries", error: error.message });
  }
};

// Get a single inquiry by ID
exports.getInquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch inquiry", error: error.message });
  }
};

// Delete an inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInquiry = await Inquiry.findByIdAndDelete(id);

    if (!deletedInquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    res.status(200).json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete inquiry", error: error.message });
  }
};
