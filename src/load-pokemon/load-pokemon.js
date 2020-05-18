import { loadPokemonIU } from '../iu/display-pokemon.js';
import { loadPokemonService } from '../servicios/servicios.js';

export function loadPokemon(idPokemon) {
  return loadPokemonService(idPokemon)
    .then((responseJSON) => {
      idPokemon = responseJSON.id;
      $('#abilities-info').empty();
      $('#img-poke').attr('src', './src/gifs/pokemon-loading.gif');
      loadPokemonIU(idPokemon, responseJSON);
    })
    .catch((error) => {
      throw error(`FALLÓ OBTENIENDO INFORMACION DEL POKEMON "${idPokemon}"`, error);
    });
}
