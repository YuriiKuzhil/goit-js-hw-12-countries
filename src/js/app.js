import fetchContries from './fetchCountries.js';
import countryCardTpl from '../templates/country-card.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
import { info, error } from '@pnotify/core';
import showAlert from './alert-message';

const MATCH_RESULTS = 'Too many matches found. Please enter a more specific query!';
const NOT_FOUND = 'This country has not been found. Check country name';
const debounce = require('lodash.debounce');
const refs = {
  contentWrapper: document.querySelector('.content-wrapper'),
  input: document.querySelector('.input'),
};

function renderCountry(countries) {
  refs.contentWrapper.innerHTML = '';
  if (countries.length == 1) {
    return refs.contentWrapper.insertAdjacentHTML('beforeend', countryCardTpl(countries));
  } else if (countries.length > 1 && countries.length <= 10) {
    return refs.contentWrapper.insertAdjacentHTML('beforeend', countriesListTpl(countries));
  } else if (countries.length > 10) {
    showAlert(info, MATCH_RESULTS);
    return;
  } else {
    showAlert(error, NOT_FOUND);
  }
}

const onSearchCountries = event => {
  let inputValue = event.target.value;
  fetchContries(inputValue).then(renderCountry);
};
refs.input.addEventListener('input', debounce(onSearchCountries, 500));
