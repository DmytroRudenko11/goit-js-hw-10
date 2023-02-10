import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

export const container = document.querySelector('.country-info');
export const resultList = document.querySelector('.country-list');
const input = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

const renderCountryInfo = searchResult => {
  resultList.innerHTML = '';
  const markup = searchResult.map(
    ({ name: { common }, capital, population, flags: { svg }, languages }) =>
      `<ul>
  <li class='item-info'>
  <img class='main-img' src='${svg}' alt='${common} flag' width='50' height='30'/>
  <span class='country-name'>${common}</span>
  </li>
  <li class='item-info'>Capital: ${capital}</li>
  <li class='item-info'>Population: ${population}</li>
  <li class='item-info'>Languages: ${Object.values(languages)}</li>
  </ul>`
  );
  return (container.innerHTML = markup);
};

const renderCountriesList = searchResult => {
  container.innerHTML = '';
  const listMarkup = searchResult.map(
    ({ flags, name: { common } }) =>
      `<li class='item-countries'><img src='${flags.svg}' width='50' height='30'/><span class='name__country-list'>${common}</span></li>`
  );
  return (resultList.innerHTML = listMarkup.join(''));
};

function onSearch(e) {
  e.preventDefault;
  const searchResult = e.target.value.trim();
  if (searchResult === '') {
    container.textContent = '';
    resultList.textContent = '';
    return;
  }

  fetchCountries(searchResult)
    .then(renderResult)
    .catch(error => error.message);
}

function renderResult(searchResult) {
  if (searchResult.length >= 10) {
    container.textContent = '';
    resultList.textContent = '';
    return Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (searchResult.length >= 2) {
    renderCountriesList(searchResult);
  }
  if (searchResult.length === 1) {
    renderCountryInfo(searchResult);
  }
}
