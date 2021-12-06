const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function requisitionAPI() {
  const data = await fetch(URL);
  const { results } = await data.json();
  return results;
}

export default requisitionAPI;
