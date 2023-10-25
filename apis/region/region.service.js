import logger from "../../config/logger.js";
import RegionModel from "../../models/region.model.js";
import { ConfilictError, NotFoundError } from "../../utils/httpErrors.js";
import { getCityFullName } from "../../utils/location/locationUtils.js";
import validate from "../../utils/responseValidation.js";
import { regionsArraySchema } from "./schema/regions.schema.js";

//초단기 실황 로그 수집 데이터를 수집할 지역 추가api
export const addRegion = async (city) => {
    try {
      const cityFullName = getCityFullName(city);
  
      if (!cityFullName) {
        logger.error("도시를 제대로 입력해주세요!");
        throw new NotFoundError("해당 도시를 찾을 수 없습니다!");
      }
  
      const isExistCity = await RegionModel.findOne({
        regionName: cityFullName,
      });
  
      if (isExistCity) {
        logger.error("이미 등록된 도시입니다.");
        throw new ConfilictError("이미 등록된 도시입니다.");
      }
      const newRegion = new RegionModel({
        regionName: cityFullName,
      });
  
      const regionData = await newRegion.save();
  
      logger.info("새로운 수집 지역을 추가하였습니다.");
      return { region: regionData.regionName };
    } catch (err) {
      logger.error(`수집할 도시 추가 오류 : ${err.message}`);
      throw err;
    }
  };
  
  //초단기 실황 로그 수집 데이터를 수집하고 있는 지역들 목록 보여주는 api
  export const getRegions = async () => {
    try {
      const regions = await RegionModel.find();
  
      if (!regions.length) {
        logger.error("수집하고 있는 도시가 없습니다!");
        throw new NotFoundError("수집하고 있는 도시가 없습니다!");
      }
  
      let result = regions.map((region)=>{
        return region.regionName;
      })

      console.log(result);
      
      validate(regionsArraySchema,result);

      logger.info("초단기 실황 데이터를 수집하고 있는 도시 목록을 보여줍니다.");
      return result;
    } catch (err) {
      logger.error(`수집 지역 리스트 보여주기 오류 : ${err.message}`);
      throw err;
    }
  };