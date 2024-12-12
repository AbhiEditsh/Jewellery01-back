const Inquiry = require("../models/Inquiry");

// POST new inquiry
const createInquiry = async (req, res) => {
  console.log(req);
  try {
    const { name, email, message } = req.body;

    const existingInquiry = await Inquiry.findOne({ name, email });
    if (existingInquiry) {
      return res
        .status(400)
        .json({
          error: "This inquiry with the same name and email already exists.",
        });
    }

    const newInquiry = new Inquiry({ name, email, message });
    await newInquiry.save();

    res.status(201).json({ message: "Inquiry submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error submitting inquiry" });
  }
};

const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching inquiries" });
  }
};

module.exports = { createInquiry, getInquiries };
