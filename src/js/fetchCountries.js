export default function fetchContries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`).then(response => response.json());
}
