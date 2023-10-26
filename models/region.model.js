import mongoose from "mongoose";

const regionSchema = new mongoose.Schema({
  regionName: {
    type: String,
    required: true,
    unique: true,
  },
},{versionKey:false});

const RegionModel = mongoose.model("Region", regionSchema);

export default RegionModel;
