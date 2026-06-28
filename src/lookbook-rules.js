export const conditionLabels = {
  sunny: '맑음',
  cloudy: '흐림',
  rainy: '비',
  snowy: '눈',
};

const weatherAdjustments = {
  sunny: '선글라스나 챙 있는 모자로 햇빛을 가볍게 막아보세요.',
  cloudy: '채도가 높은 액세서리로 흐린 하늘에 생기를 더하세요.',
  rainy: '방수 아우터와 빠르게 마르는 소재를 우선으로 고르세요.',
  snowy: '보온성이 좋은 방한 소품과 미끄럼 방지 슈즈를 챙기세요.',
};

const rules = [
  {
    min: -20,
    max: 4,
    season: 'Deep Winter',
    title: '헤비 다운 방한룩',
    image: 'assets/lookbook/cold.svg',
    alt: '추운 날씨 방한 룩북 일러스트',
    description: '롱패딩, 기모 이너, 울 머플러를 조합해 체온을 지키는 실용적인 겨울 스타일입니다.',
    items: ['롱패딩', '히트 이너', '울 머플러', '방한 부츠'],
  },
  {
    min: 5,
    max: 15,
    season: 'Crisp Layer',
    title: '트렌치 코트 레이어드룩',
    image: 'assets/lookbook/cool.svg',
    alt: '선선한 날씨 트렌치 코트 룩북 일러스트',
    description: '셔츠 위에 니트 베스트와 트렌치 코트를 더해 선선한 공기에 대응하는 클래식 룩입니다.',
    items: ['트렌치 코트', '니트 베스트', '코튼 셔츠', '로퍼'],
  },
  {
    min: 16,
    max: 24,
    season: 'Mild Day',
    title: '라이트 재킷 데일리룩',
    image: 'assets/lookbook/mild.svg',
    alt: '포근한 날씨 라이트 재킷 룩북 일러스트',
    description: '얇은 니트와 라이트 재킷을 레이어드하면 일교차에도 균형 잡힌 룩을 유지할 수 있어요.',
    items: ['라이트 재킷', '얇은 니트', '와이드 팬츠', '스니커즈'],
  },
  {
    min: 25,
    max: 50,
    season: 'Hot Breeze',
    title: '린넨 셔츠 쿨링룩',
    image: 'assets/lookbook/hot.svg',
    alt: '더운 날씨 린넨 셔츠 룩북 일러스트',
    description: '통기성이 좋은 린넨과 밝은 컬러를 선택해 더운 날에도 산뜻한 무드를 유지하세요.',
    items: ['린넨 셔츠', '쿨 티셔츠', '쇼츠', '샌들'],
  },
];

export function getLookbookRecommendation({ temperature, condition, windy }) {
  const baseRule = rules.find((rule) => temperature >= rule.min && temperature <= rule.max) || rules[2];
  const windItem = windy ? ['윈드브레이커'] : [];
  const weatherItem = condition === 'rainy' ? ['접이식 우산'] : condition === 'snowy' ? ['방수 장갑'] : [];

  return {
    ...baseRule,
    description: `${baseRule.description} ${weatherAdjustments[condition]}`,
    items: [...baseRule.items, ...windItem, ...weatherItem].slice(0, 6),
  };
}
