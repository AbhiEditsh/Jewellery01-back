const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const productRoutes = require('./route/product');
const categoryRoutes = require('./route/categoryRoutes');
const dbConnection = require("./config/db");

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
// Start the server
const PORT =5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));