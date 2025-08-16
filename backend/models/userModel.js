import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    plan:{
        type: String,
        enum: ['free', 'pro', 'enterprise'],
        default: 'free'
    },
    maxStorage: {
        type: Number,
        default: 5 * 1024 * 1024 * 1024
    },
    storageUsed: {
        type: Number,
        default: 0
    },
    rootDir: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder'
    }
},{timestamps: true});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;