import mongoose from "mongoose";
import { MONGODB_URI } from "../../config";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined");
}

export const ConnectDB = async () => {
    try {
        const  {connection}= await mongoose.connect(MONGODB_URI);
        if (connection.readyState===1) {
            console.log("database is ready connected");
            return Promise.resolve(true)
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error)
    }
};
