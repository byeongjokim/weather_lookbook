import { conditionLabels, getLookbookRecommendation } from './lookbook-rules.js';

const temperatureInput = document.querySelector('#temperature');
const temperatureOutput = document.querySelector('#temperatureOutput');
const windyInput = document.querySelector('#windy');
const conditionInputs = [...document.querySelectorAll('input[name="condition"]')];
const lookbookImage = document.querySelector('#lookbookImage');
const weatherBadge = document.querySelector('#weatherBadge');
const lookbookSeason = document.querySelector('#lookbookSeason');
const lookbookTitle = document.querySelector('#lookbookTitle');
const lookbookDescription = document.querySelector('#lookbookDescription');
const lookbookItems = document.querySelector('#lookbookItems');

function getSelectedCondition() {
  return conditionInputs.find((input) => input.checked)?.value ?? 'sunny';
}

function renderLookbook() {
  const temperature = Number(temperatureInput.value);
  const condition = getSelectedCondition();
  const recommendation = getLookbookRecommendation({
    temperature,
    condition,
    windy: windyInput.checked,
  });

  temperatureOutput.value = `${temperature}°C`;
  weatherBadge.textContent = `${temperature}°C · ${conditionLabels[condition]}${windyInput.checked ? ' · 강풍' : ''}`;
  lookbookSeason.textContent = recommendation.season;
  lookbookTitle.textContent = recommendation.title;
  lookbookDescription.textContent = recommendation.description;
  lookbookImage.src = recommendation.image;
  lookbookImage.alt = recommendation.alt;
  lookbookItems.replaceChildren(
    ...recommendation.items.map((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      return listItem;
    }),
  );
}

[temperatureInput, windyInput, ...conditionInputs].forEach((input) => {
  input.addEventListener('input', renderLookbook);
  input.addEventListener('change', renderLookbook);
});

renderLookbook();
