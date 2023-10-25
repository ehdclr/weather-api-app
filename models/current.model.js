import mongoose from "mongoose";

const currentDataSchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    fcstDate: {
      type: String,
      required: true,
    },
    fcstTime: {
      type: String,
      required: true,
    },
    weatherData: {
      type: Object,
    },
    createdAt: {
      type: Date,
      expires: 2 * 24 * 60 * 60,
      default: Date.now,
    },
  },
  { versionKey: false }
);

currentDataSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });

const CurrentDataModel = mongoose.model("CurrentData", currentDataSchema);

export default CurrentDataModel;
