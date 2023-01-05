const mongoose = require('mongoose');

// async function b/c returns promise. connecting to a db takes time!
const connectDB = async () => {
  mongoose.set('strictQuery', false);
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`(!) MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;