import mongoose from "mongoose";

async function connectToDb() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  return mongoose.connection;
}

export default connectToDb;