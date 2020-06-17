import { loadPokemonIU } from '../iu/display-pokemon.js';
import { loadPokemonService } from '../servicios/servicios.js';
import { displayPreloadEnvironment } from '../iu/display-pokemon.js';

const language = "es";

export async function loadPokemon(idOrName) {
  displayPreloadEnvironment();  
  const pokemonClass = await loadPokemonService(idOrName, language);
  loadPokemonIU(pokemonClass);
}
