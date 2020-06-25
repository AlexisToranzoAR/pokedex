import {
  loadPage,
  changePage,
} from '../tabla-pokemons/tabla.js';
import {
  disableNavButton,
  disableNavPokemonButton,
} from './disable-buttons.js';
import { loadPokemon } from '../../servicios/pokemon/load-pokemon/load-pokemon.js';

export function pageDown() {
  let currentPage = $('#pokemons-container').data('page-number');
  currentPage--;
  $('#pokemons-container').data('page-number', currentPage);
  loadPage(currentPage);
  disableNavButton(currentPage);
}

export function pageUp() {
  let currentPage = $('#pokemons-container').data('page-number');
  currentPage++;
  $('#pokemons-container').data('page-number', currentPage);
  loadPage(currentPage);
  disableNavButton(currentPage);
}

export function previousPokemon() {
  let selectedPokemon = $('#pokemons-container').data('selected-pokemon-id');
  selectedPokemon--;
  $('#pokemons-container').data('selected-pokemon-id', selectedPokemon);
  $('h1').html('Cargando...');
  loadPokemon(selectedPokemon);
  disableNavPokemonButton(selectedPokemon);
  changePage(selectedPokemon);
}

export function nextPokemon() {
  let selectedPokemon = $('#pokemons-container').data('selected-pokemon-id');
  selectedPokemon++;
  $('#pokemons-container').data('selected-pokemon-id', selectedPokemon);
  $('h1').html('Cargando...');
  loadPokemon(selectedPokemon);
  disableNavPokemonButton(selectedPokemon);
  changePage(selectedPokemon);
}

export function homePage() {
  $('#pokemons-container').attr('data-selected-pokemon-id', 0);
  $('#pokemons-container').attr('data-selected-pokemon-name', '');
  $('h1').html('Pokemons');
  $('#abilities-info').empty();
  $('#img-poke').attr('src', '');
  $('#pokemons-container').removeClass('d-none');
  $('#pokemon-container').addClass('d-none');
  $('#page-number-buttons').removeClass('d-none');
  $('#pokemon-number-buttons').addClass('d-none');
}
