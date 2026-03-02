const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/upload", require("./routes/uploadRoutes"));
app.use("/categorize", require("./routes/categorizeRoutes"));

app.listen(5000, () => console.log("Backend running"));