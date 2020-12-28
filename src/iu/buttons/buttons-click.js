import {
  pageDown,
  pageUp,
  previousPokemon,
  nextPokemon,
  homePage,
} from './buttons.js';
import { clickSearch } from '../../servicios/pokemon/search-pokemon/search.js';

$('#search').on('click', () => {
  clickSearch();
  return false;
});

$('#previous-page').on('click', () => {
  pageDown();
  return false;
});

$('#next-page').on('click', () => {
  pageUp();
  return false;
});

$('#previous-pokemon').on('click', () => {
  previousPokemon();
  return false;
});

$('#next-pokemon').on('click', () => {
  nextPokemon();
  return false;
});

$('#home-page').on('click', () => {
  homePage();
  return false;
});
