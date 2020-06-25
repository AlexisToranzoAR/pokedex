import { loadPokemon } from '../../servicios/pokemon/load-pokemon/load-pokemon.js';
import { disableNavPokemonButton } from '../buttons/disable-buttons.js';

$('#pokemons-container').click(clickPokemon);

function clickPokemon(e) {
  const element = (e.target.parentElement.id);
  const idPokemon = $(`#${element} figcaption`).data('id');
  loadPokemon(idPokemon);
  disableNavPokemonButton(idPokemon);
}
