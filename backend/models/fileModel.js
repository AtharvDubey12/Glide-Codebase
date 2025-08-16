import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: String,
  url: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parentFolder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
  size: Number,
  type: String,
  isPublic: {
    type: Boolean,
    default: true,
  },
  uploadedAt: { type: Date, default: Date.now }
});

const File = mongoose.models.File || mongoose.model('File', fileSchema);
export default File;