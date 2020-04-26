import { loadPage } from './tabla-pokemones/tabla.js';
import './click-pokemon/click-pokemon.js';
import './buttons/buttons-click.js';

$('#pokemons-container').data('page-number',1);
const currentPage = $('#pokemons-container').data('page-number');

loadPage(currentPage);
