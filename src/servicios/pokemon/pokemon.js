import {
  selectAbilitiesLanguages,
} from './select-language/select-abilities-language.js'
import {
  loadPokemonDataAPI,
} from '../../API/pokeAPI.js';
import {
  loadPokemonLocalStorage,
  savePokemon,
} from './storage/pokemon.js';
import {
  mapearPokemon,
} from './mapper.js';

export async function loadPokemon(idOrName,language) {
  if (idOrName === undefined || language === undefined) {
    throw new Error('Se necesita una id y un idioma para cargar un pokemón');
  }

  try {
    const pokemonData = loadPokemonLocalStorage(idOrName, language);
    return pokemonData;
  } catch (e) {
    try {
      const pokemonData = await loadPokemonDataAPI(idOrName);
      const pokemonClass = mapearPokemon(pokemonData);
      await selectAbilitiesLanguages(language, pokemonClass);
      savePokemon(idOrName, pokemonClass, language);
      return pokemonClass;
    } catch (error) {
      throw new Error(`Fallo consiguiendo info del pokemon ${idOrName}`);
    }
  }
}
