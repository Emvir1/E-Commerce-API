const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");

const app = express();
const db = mongoose.connection;
const port = process.env.PORT || 4000;

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

mongoose.connect(
  "mongodb+srv://admin:admin123@batch-253-rivera.48prqki.mongodb.net/s42-46?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

db.once("open", () => console.log("Connected MongoDB"));

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoute);
app.use("/products", productRoute);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is now online on port ${port}`);
  });
}

module.exports = app;
