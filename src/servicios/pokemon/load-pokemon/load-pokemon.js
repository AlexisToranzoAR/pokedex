import { loadPokemonIU } from '../../../iu/display-pokemon.js';
import { loadPokemon as loadPokemonService} from '../pokemon.js';
import { displayPreloadEnvironment } from '../../../iu/display-pokemon.js';

const language = "es";

export async function loadPokemon(idOrName) {  
  const pokemonClass = await loadPokemonService(idOrName, language);
  displayPreloadEnvironment();
  loadPokemonIU(pokemonClass);
}
