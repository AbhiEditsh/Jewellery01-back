const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./config/db");
const productRoutes = require("./route/product");
const categoryRoutes = require("./route/categoryRoutes");
const inquiryRoutes = require("./route/inquiryRoutes");
const reviewRoutes = require("./route/review");

dotenv.config();
dbConnection();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome Jewellery");
});

// Router
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/review", reviewRoutes);
// Start the server
const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
