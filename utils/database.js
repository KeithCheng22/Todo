import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {

    if (isConnected) {
        console.log('DB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'myFirstDatabase',
            useNewUrlParser: true,
            useUnifiedTopology: true
            
        })
        isConnected = true;
        if (isConnected) console.log("DB Connected!")

    } catch(error) {
        console.log('Failed to connect to DB.')
    }
}