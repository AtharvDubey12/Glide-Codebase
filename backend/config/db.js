import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("DB Connected Successfully");
    });
    }
    catch{
        console.log("Couldn't connect to DB");
    }
}