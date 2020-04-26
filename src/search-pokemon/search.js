import { loadPokemon } from '../load-pokemon/load-pokemon.js';
import { disableNavPokemonButton } from '../iu/disable-buttons.js';
import { displayPokemonInfo } from '../iu/display-pokemon.js';

export function clickSearch(){
    const idActualPokemon = $('#pokemons-container').data("selected-pokemon-id");
    const nameActualPokemon = $('#pokemons-container').data("selected-pokemon-name");
    const $pokemonID = Number($('#search-pokemon')[0].value);
    const $pokemonName = $('#search-pokemon')[0].value.toLowerCase();
    if(!($pokemonID === idActualPokemon) && !($pokemonName === nameActualPokemon)){
        if(!($pokemonID === NaN) && $pokemonID<808){
            $("#abilities-info").empty();
            $("#img-poke").attr("src","./src/gifs/pokemon-loading.gif");
            displayPokemonInfo();
            loadPokemon($pokemonID);
            disableNavPokemonButton($pokemonID);
        }else if(/^[a-z]+$/i.test($pokemonName)){
            $("#abilities-info").empty();
            $("#img-poke").attr("src","./src/gifs/pokemon-loading.gif");
            loadPokemon($pokemonName)
                .then(response => {
                    if(response){
                        const idPokemon = $('#pokemons-container').data("selected-pokemon-id");
                        displayPokemonInfo();
                        disableNavPokemonButton(idPokemon);
                    }else{
                        alert("Pokemon no encontrado, asegurece de haber escrito el nombre correctamente")
                    }
                })
        }else{
            alert("Pokemon no encontrado, asegurece de haber escrito la id correctamente")
        }
    }
}