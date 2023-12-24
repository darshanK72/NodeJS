import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.connect(url,{ useNewUrlParser: true })
    .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    }).catch((error) => {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    })
}


export default connectDB;