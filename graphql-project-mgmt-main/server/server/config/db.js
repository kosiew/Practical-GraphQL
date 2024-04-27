const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
console.log(`mongo_uri: ${uri}`);

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
