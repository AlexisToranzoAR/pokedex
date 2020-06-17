import { loadPage } from './tabla-pokemones/tabla.js';
import './click-dom/click-pokemon.js';
import './click-dom/buttons-click.js';

$('#pokemons-container').data('page-number', 1);
const currentPage = $('#pokemons-container').data('page-number');

loadPage(currentPage);
