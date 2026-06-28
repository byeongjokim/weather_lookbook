import { WEATHER_CONFIG } from "./config.js";
import { fetchCurrentWeather } from "./weather.js";
import { selectLookbook } from "./lookbook-rules.js";

const fallbackWeather = {
  temperature: 18,
  humidity: 55,
  precipitationType: "none",
  baseTime: "--",
};

const precipitationLabels = {
  none: "없음",
  rain: "비",
  snow: "눈",
};

const weatherIcons = {
  none: "☁",
  rain: "☔",
  snow: "❄",
};

async function init() {
  const status = document.querySelector("#statusMessage");
  try {
    const weather = await fetchCurrentWeather(WEATHER_CONFIG);
    render(weather, "기상청 초단기실황 기준으로 업데이트되었습니다.");
  } catch (error) {
    console.warn(error);
    render(fallbackWeather, `임시 날씨값을 표시 중입니다. ${error.message}`);
  }
  status.dataset.ready = "true";
}

function render(weather, statusMessage) {
  const look = selectLookbook(weather);
  document.querySelector("#temperature").textContent = formatNumber(weather.temperature);
  document.querySelector("#humidity").textContent = formatNumber(weather.humidity);
  document.querySelector("#precipitation").textContent = precipitationLabels[weather.precipitationType] ?? "확인 중";
  document.querySelector("#weatherIcon").textContent = weatherIcons[weather.precipitationType] ?? "☁";
  document.querySelector("#updatedAt").textContent = formatBaseTime(weather.baseTime);
  document.querySelector("#lookTitle").textContent = look.title;
  document.querySelector("#lookDescription").textContent = look.description;
  document.querySelector("#lookbookImage").src = look.image;
  document.querySelector("#lookbookImage").alt = look.title;
  document.querySelector("#statusMessage").textContent = statusMessage;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "--";
  return Math.round(value);
}

function formatBaseTime(baseTime) {
  if (!baseTime || baseTime.length < 4) return "--:--";
  return `${baseTime.slice(0, 2)}:${baseTime.slice(2, 4)}`;
}

init();
