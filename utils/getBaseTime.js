//! baseDate 구하기 (초단기 실황 baseDate, baseTime 구하는 로직)
export function getCurrentApiDateAndTime() {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const year = koreaTime.getFullYear();
  const month = koreaTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  let day = koreaTime.getDate();

  let hours = koreaTime.getHours();
  let minutes = koreaTime.getMinutes();

  if (minutes < 40) {
    if (hours === 0) {
      koreaTime.setDate(day - 1);
      day = koreaTime.getDate();
      hours = 23;
    } else {
      hours = hours - 1;
    }
  }
  let baseTime = `${hours < 10 ? "0" : ""}${hours}${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  let baseDate = `${year}${month < 10 ? "0" : ""}${month}${
    day < 10 ? "0" : ""
  }${day}`;

  return { baseTime, baseDate };
}

//! 초단기 api 제공시간은 45분임
export function getUrtShortApiDateAndTime() {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const year = koreaTime.getFullYear();
  const month = koreaTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  let day = koreaTime.getDate();

  let hours = koreaTime.getHours();
  let minutes = koreaTime.getMinutes();

  //만약 0439면 0339으로 base시간이 되어야함 - 40분 주기로 api 제공을 하기 때문에
  //만약에 0039 여서 2339로 빼야하면 day를 하루 빼어야함
  if (minutes < 45) {
    if (hours === 0) {
      // 자정 이전인 경우, 날짜를 하루 빼야함
      koreaTime.setDate(day - 1);
      day = koreaTime.getDate();
      hours=23;
    } else {
      hours = hours - 1;
    }
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

//단기예보 api 제공시간은 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10
export function getShortTermApiDateAndTime() {
  const apiTimes = [2310, 2010, 1710, 1410, 1110, 810, 510, 210];
  const now = new Date();
  const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  const currentTime = koreaTime.getHours() * 100 + koreaTime.getMinutes();

  // 현재 시간보다 이전의 시간을 찾기 위해 apiTimes을 역순으로 검사
  for (let time of apiTimes) {
    if (time <= currentTime) {
      const baseDate = `${koreaTime.getFullYear()}${(koreaTime.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${koreaTime.getDate().toString().padStart(2, "0")}`;
      const baseTime = `${Math.floor(time / 100)
        .toString()
        .padStart(2, "0")}${(time % 100).toString().padStart(2, "0")}`;
      return { baseDate, baseTime };
    }
  }

  // 모든 apiTimes이 현재 시간보다 뒤에 있는 경우 (즉, 02:10 전) 이전 날짜의 23:10을 반환
  const prevDate = new Date(koreaTime);
  prevDate.setDate(koreaTime.getDate() - 1);
  return {
    baseDate: `${prevDate.getFullYear()}${(prevDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${prevDate.getDate().toString().padStart(2, "0")}`,
    baseTime: "2310",
  };
}
