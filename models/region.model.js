import mongoose from 'mongoose';

const regionSchema = new mongoose.Schema({
  regionName: {
    type: String,
    required: true,
    unique: true,
  },
  currentDatas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CurrentData',
    },
  ],
});

const RegionModel = mongoose.model('Region', regionSchema);

export default RegionModel;
