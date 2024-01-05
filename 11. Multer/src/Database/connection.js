import mongoose from 'mongoose';

export const connectDB = (url,database) => {
    mongoose.connect(`${url}/${database}`).then(conn => {
        console.log(`Mongodb Connected at ${conn.connection.host}`);
        return conn;
    }).catch(error => {
        console.log(error);
    })
}