import {
  loadPokemonDataAPI,
} from '../API/pokeAPI.js';
import {
  loadPokemonLocalStorage,
  savePokemon,
} from '../storage/pokemon.js';

export async function loadPokemonService(id) {
  if (id === undefined) {
    throw new Error('Se necesita una id para cargar un pokemón');
  }

  try {
    return loadPokemonLocalStorage(id);
  } catch (e) {
    try {
      const pokemon = await loadPokemonDataAPI(id);
      savePokemon(id, pokemon);
      return pokemon;
    } catch (error) {
      throw new Error(`Fallo consiguiendo info del pokemon ${id}`);
    }
  }
}
