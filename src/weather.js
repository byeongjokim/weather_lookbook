const API_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";

export function toKmaGrid(latitude, longitude) {
  const RE = 6371.00877;
  const GRID = 5.0;
  const SLAT1 = 30.0;
  const SLAT2 = 60.0;
  const OLON = 126.0;
  const OLAT = 38.0;
  const XO = 43;
  const YO = 136;
  const DEGRAD = Math.PI / 180.0;
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);
  let ra = Math.tan(Math.PI * 0.25 + latitude * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = longitude * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  return {
    nx: Math.floor(ra * Math.sin(theta) + XO + 0.5),
    ny: Math.floor(ro - ra * Math.cos(theta) + YO + 0.5),
  };
}

export function getKmaBaseTime(date = new Date()) {
  const base = new Date(date);
  base.setMinutes(0, 0, 0);
  if (date.getMinutes() < 45) base.setHours(base.getHours() - 1);
  const yyyy = String(base.getFullYear());
  const mm = String(base.getMonth() + 1).padStart(2, "0");
  const dd = String(base.getDate()).padStart(2, "0");
  const hh = String(base.getHours()).padStart(2, "0");
  return { baseDate: `${yyyy}${mm}${dd}`, baseTime: `${hh}00` };
}

export async function fetchCurrentWeather(config) {
  if (!config.serviceKey || config.serviceKey.includes("PASTE_")) {
    throw new Error("기상청 API 키를 src/config.js에 입력해주세요.");
  }

  const { nx, ny } = toKmaGrid(config.latitude, config.longitude);
  const { baseDate, baseTime } = getKmaBaseTime();
  const params = new URLSearchParams({
    serviceKey: config.serviceKey,
    pageNo: "1",
    numOfRows: "20",
    dataType: "JSON",
    base_date: baseDate,
    base_time: baseTime,
    nx: String(nx),
    ny: String(ny),
  });

  const response = await fetch(`${API_URL}?${params.toString()}`);
  if (!response.ok) throw new Error(`기상청 API 요청 실패: ${response.status}`);
  const data = await response.json();
  const items = data?.response?.body?.items?.item;
  if (!Array.isArray(items)) throw new Error("기상청 API 응답 형식이 올바르지 않습니다.");

  const byCategory = Object.fromEntries(items.map((item) => [item.category, item.obsrValue]));
  return {
    temperature: Number(byCategory.T1H),
    humidity: Number(byCategory.REH),
    precipitationType: normalizePrecipitation(byCategory.PTY),
    baseDate,
    baseTime,
    nx,
    ny,
  };
}

export function normalizePrecipitation(value) {
  const code = String(value ?? "0");
  if (code === "0") return "none";
  if (code === "3") return "snow";
  if (code === "7") return "snow";
  return "rain";
}
