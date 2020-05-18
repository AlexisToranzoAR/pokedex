import { loadPokemon } from '../load-pokemon/load-pokemon.js';
import { disableNavPokemonButton } from '../iu/disable-buttons.js';
import { displayPokemonInfo } from '../iu/display-pokemon.js';
import { displayTopAlert } from '../iu/display-alerts.js';

export function clickSearch() {
  const idActualPokemon = $('#pokemons-container').data('selected-pokemon-id');
  const nameActualPokemon = $('#pokemons-container').data('selected-pokemon-name');
  const $pokemonID = Number($('#search-pokemon')[0].value);
  const $pokemonName = $('#search-pokemon')[0].value.toLowerCase();
  if (!($pokemonID === idActualPokemon) && !($pokemonName === nameActualPokemon)) {
    if (!(Number.isNaN($pokemonID)) && $pokemonID < 808) {
      $('#abilities-info').empty();
      $('#img-poke').attr('src', './src/gifs/pokemon-loading.gif');
      displayPokemonInfo();
      loadPokemon($pokemonID);
      disableNavPokemonButton($pokemonID);
    } else if (/\w/.test($pokemonName) && typeof $pokemonName === 'string'){
      loadPokemon($pokemonName)
        .then(() => {
            const idPokemon = $('#pokemons-container').data('selected-pokemon-id');
            displayPokemonInfo();
            disableNavPokemonButton(idPokemon);
        })
        .catch(() => {
            const strongText = `Pokemon "${$pokemonName}" no encontrado,`;
            const text = ' asegurece de haber escrito el nombre correctamente.';
            const alertType = 'warning';
            displayTopAlert(strongText, text, alertType);
        })
    } else {
      const strongText = `Pokemon con ID ${$pokemonID} no encontrado,`;
      const text = 'asegurece de haberla escrito correctamente.';
      const alertType = 'warning';
      displayTopAlert(strongText, text, alertType);
    }
  }
}
