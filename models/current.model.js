import mongoose from "mongoose";

//초실황예보 데이터 저장 1시간 기준
const currentDataSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  baseDate: {
    type: String,
    required: true,
  },
  baseTime: {
    type: String,
    required: true,
  },
  weatherData: [
    {
      category: {
        type: String,
        required: true,
      },
      obsrValue: {
        type: String,
        required: true,
      },
      _id: false,
    },
  ],
});

const CurrentDataModel = mongoose.model("CurrentData", currentDataSchema);

export default CurrentDataModel;
