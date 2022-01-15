import axios from 'axios';

const getCharizard = () => {
  return axios.get('https://pokeapi.co/api/v2/pokemon/6');
};

const getPokemons = () => {
  return axios.get('https://pokeapi.co/api/v2/pokemon?limit=5&offset=5');
};

export { getCharizard, getPokemons };
