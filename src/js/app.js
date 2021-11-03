import fetchContries from './fetchCountries.js';
import countryCardTpl from '../templates/country-card.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
const debounce = require('lodash.debounce');

const refs = {
  contentWrapper: document.querySelector('.content-wrapper'),
  input: document.querySelector('.input'),
};

function renderCountry(countries) {
  refs.contentWrapper.innerHTML = '';
  if (countries.length == 1) {
    refs.contentWrapper.insertAdjacentHTML('beforeend', countryCardTpl(countries));
  } else if (countries.length > 1 && countries.length <= 10) {
    refs.contentWrapper.insertAdjacentHTML('beforeend', countriesListTpl(countries));
  }
}

fetchContries('ukraine').then(renderCountry);

const changeTextFontSize = event => {
  let inputValue = event.target.value;
  console.log(inputValue);
};
refs.input.addEventListener('input', debounce(changeTextFontSize, 500));
