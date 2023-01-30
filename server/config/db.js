const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    )
  } catch (error) {
    console.log('Connect to mongodb failed');
    process.exit();
  }
}
module.exports = connectDB;