import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.connect(url,{ useNewUrlParser: true })
    .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    })
}


export default connectDB;