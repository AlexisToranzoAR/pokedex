import { loadPokemonIU } from '../iu/display-pokemon.js'
import { loadPokemonDataAPI } from '../API/pokeAPI.js'

export function loadPokemon(idPokemon){
    return loadPokemonDataAPI(idPokemon)
        .then(responseJSON => {
            idPokemon = responseJSON.id;
            loadPokemonIU(idPokemon,responseJSON);
            return true;
        })
        .catch(error => {
        console.error(`FALLÓ OBTENIENDO INFORMACION DEL POKEMON "${idPokemon}"`, error);
        return false;
        })
}
