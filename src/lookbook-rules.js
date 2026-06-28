export const LOOKBOOK_RULES = [
  {
    id: "cold-clear",
    tempMin: -20,
    tempMax: 10,
    humidityMin: 0,
    humidityMax: 100,
    precipitation: "none",
    image: "./assets/lookbook/cold-clear.svg",
    title: "차가운 공기를 위한 레이어드 룩",
    description: "낮은 기온에는 포근한 이너와 여유 있는 아우터를 추천합니다.",
  },
  {
    id: "rainy",
    tempMin: -20,
    tempMax: 45,
    humidityMin: 0,
    humidityMax: 100,
    precipitation: "rain",
    image: "./assets/lookbook/rainy.jpeg",
    title: "비 오는 성수동을 위한 드라이 룩",
    description: "습한 날에는 가볍고 관리하기 쉬운 실루엣을 추천합니다.",
  },
  {
    id: "snowy",
    tempMin: -20,
    tempMax: 45,
    humidityMin: 0,
    humidityMax: 100,
    precipitation: "snow",
    image: "./assets/lookbook/snowy.svg",
    title: "눈 오는 날의 웜 컴포트 룩",
    description: "보온감과 움직임을 함께 고려한 스타일입니다.",
  },
  {
    id: "mild",
    tempMin: 10,
    tempMax: 21,
    humidityMin: 0,
    humidityMax: 100,
    precipitation: "none",
    image: "./assets/lookbook/mild.jpeg",
    title: "하루 종일 편안한 데일리 룩",
    description: "성수동의 산책과 일상에 자연스럽게 어울리는 조합입니다.",
  },
  {
    id: "hot",
    tempMin: 25,
    tempMax: 45,
    humidityMin: 0,
    humidityMax: 100,
    precipitation: "none",
    image: "./assets/lookbook/hot.jpeg",
    title: "더운 날의 라이트 컴포트 룩",
    description: "가볍고 통기성 있는 아이템으로 산뜻하게 입는 룩입니다.",
  },
];

export function selectLookbook(weather) {
  return LOOKBOOK_RULES.find((rule) => {
    return weather.temperature >= rule.tempMin &&
      weather.temperature < rule.tempMax &&
      weather.humidity >= rule.humidityMin &&
      weather.humidity <= rule.humidityMax &&
      weather.precipitationType === rule.precipitation;
  }) ?? LOOKBOOK_RULES[3];
}
