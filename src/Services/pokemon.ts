import axios from 'axios';
import { Pokemon } from '../types';

type GetPokemonsResponse = {
  results: Pokemon[];
};

const getCharizard = () => {
  // API returns more things but we only want two of them and it's not worth to type everything for this task
  return axios.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/6');
};

const getPokemons = () => {
  // API returns more things but we only want one of them and it's not worth to type everything for this task
  return axios.get<GetPokemonsResponse>('https://pokeapi.co/api/v2/pokemon?limit=5&offset=5');
};

export { getCharizard, getPokemons };
