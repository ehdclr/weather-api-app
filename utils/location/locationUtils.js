import XLSX from "xlsx";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, '../data/location.xlsx');

export const getLatitudeAndLongitude = (cityName) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  for (let row of data) {
    if (row.시도.includes(cityName)) {
      return {
        lat: row.위도,
        lng: row.경도,
      };
    }
  }

  return null;
};


export const getCityFullName =(cityName) =>{
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  for (let row of data) {
    if(row.시도.includes(cityName)){
      return row.시도
    }
  }

  return null;
}