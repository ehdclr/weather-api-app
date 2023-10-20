//오늘 날짜 계산
//baseDate 구하기 (초단기 실황 baseDate, baseTime 구하는 로직)
export function getCurrentApiDateAndTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  let day = now.getDate();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  //만약 0439면 0339으로 base시간이 되어야함 - 40분 주기로 api 제공을 하기 때문에
  //만약에 0039 여서 2339로 빼야하면 day를 하루 빼어야함
  if (minutes < 40) {
    if (hours === 0) {
      // 자정 이전인 경우, 날짜를 하루 빼야함
      now.setDate(day - 1);
      day = now.getDate() -1;
    } 
      hours = hours -1;
  }
  //만약 지금 시간이 0039라면 날짜 -1 하고 2339가 되어야함
  let baseTime = `${hours < 10 ? "0" : ""}${hours}${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  let baseDate = `${year}${month < 10 ? "0" : ""}${month}${
    day < 10 ? "0" : ""
  }${day}`;

  return { baseTime, baseDate };
}

//   //현재 시간 계신 (baseTime 구하기) - 초실황 baseTime - api 제공시간 40분이 기준이기때문에
// export function getCurrentApiTime() {
//     let now = new Date();
//     let hours = now.getHours();
//     let minutes = now.getMinutes();
//     //만약 0439면 0339으로 base시간이 되어야함 - 40분 주기로 api 제공을 하기 때문에
//     if( minutes < 40 ) {
//       now.setHours(hours -1);
//     }
//     //만약 지금 시간이 0039라면 날짜 -1 하고 2339가 되어야함
//     let apiTime = `${hours < 10 ? "0" : ""}${now.getHours()}${minutes < 10 ? "0" : ""}${minutes}`;

//     return apiTime;
//   }

console.log(getCurrentApiDateAndTime())