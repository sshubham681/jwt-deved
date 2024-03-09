import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to Database");
  } catch (error) {
    console.log(error);
  }
};

export { connectToDB };
