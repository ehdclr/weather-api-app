import mongoose from "mongoose";

//초실황예보 데이터 저장 1시간 기준
const currentDataSchema = new mongoose.Schema({
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
  }
},{versionKey: false});

const CurrentDataModel = mongoose.model("CurrentData", currentDataSchema);

export default CurrentDataModel;
