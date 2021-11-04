import fetchContries from './fetchCountries.js';
import countryCardTpl from '../templates/country-card.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { info, error, Stack } from '@pnotify/core';

const debounce = require('lodash.debounce');
const refs = {
  contentWrapper: document.querySelector('.content-wrapper'),
  input: document.querySelector('.input'),
};
const stack = new Stack({
  dir1: 'down',
  dir2: 'right',
  firstpos1: 90,
  firstpos2: 90,
});
function renderCountry(countries) {
  refs.contentWrapper.innerHTML = '';
  if (countries.length == 1) {
    return refs.contentWrapper.insertAdjacentHTML('beforeend', countryCardTpl(countries));
  } else if (countries.length > 1 && countries.length <= 10) {
    return refs.contentWrapper.insertAdjacentHTML('beforeend', countriesListTpl(countries));
  } else if (countries.length > 10) {
    onRenderError(error, 'Too many matches found. Please enter a more specific query!');
    return;
  } else {
    onRenderError(info, 'No matches found!');
  }
}

const onSearchCountries = event => {
  let inputValue = event.target.value;
  fetchContries(inputValue)
    .then(renderCountry)
    .catch(error => {
      alert('ERROR! Please, try later');
    });
};
refs.input.addEventListener('input', debounce(onSearchCountries, 500));

function onRenderError(type, text) {
  type({ text: `${text}`, delay: 2000, stack: stack });
}
