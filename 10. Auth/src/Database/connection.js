import mongoose from 'mongoose';

export const connectDB = async (url,database) => {
    mongoose.connect(`${url}/${database}`).then((conn) => {
        console.log(`Mongodb Connected at ${conn.connection.host}`);
        return conn;
    })
}