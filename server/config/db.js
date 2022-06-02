const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/mernapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);

//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
