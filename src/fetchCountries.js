import Notiflix from 'notiflix';

export function fetchCountries(name) {
  const searchParams = 'fields=name,capital,population,flags,languages';
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?${searchParams}`
  ).then(response => {
    if (response.status === 404) {
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    } else if (!response.ok) {
      throw Error('Can not fetch country');
    }

    return response.json();
  });
}
