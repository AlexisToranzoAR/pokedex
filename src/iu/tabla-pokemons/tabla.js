import { firstCapitalLetter } from '../../utilidades/utilidades.js';
import { disableNavButton } from '../buttons/disable-buttons.js';
import { loadImgBastionAPI } from '../../API/bastionbotAPI.js';
import {
  loadImgPokeAPI,
  loadPokemonDataAPI,
} from '../../API/pokeAPI.js';
import './click-pokemon.js';
import '../buttons/buttons-click.js';

export function loadPage(number = 1) {
  $('#pokemons-container').data('page-number', number);
  cleanFiguresChilds();
  const pokemones = 18 * number;
  let element = 0;
  for (let i = pokemones - 17; i <= pokemones; i++) {
    element++;
    createFigure(element, i);
  }
}

export function changePage(idPokemon) {
  const pageNumber = Math.ceil(idPokemon / 18);
  let currentPage = $('#pokemons-container').data('page-number');
  if (pageNumber > currentPage) {
    while (pageNumber > currentPage) {
      currentPage++;
      $('#pokemons-container').data('page-number', currentPage);
    }
    disableNavButton(currentPage);
    loadPage(currentPage);
  } else if (pageNumber < currentPage) {
    while (pageNumber < currentPage) {
      currentPage--;
      $('#pokemons-container').data('page-number', currentPage);
    }
    disableNavButton(currentPage);
    loadPage(currentPage);
  }
}

function cleanFiguresChilds() {
  $('.name-poke').html('');
  $('.name-poke').attr('data-id', '');
  $('.img-poke').attr('src', '');
}

function createFigure(element, idPokemon) {
  loadImage(element, idPokemon);
  namePokemon(idPokemon)
    .then((response) => {
      $(`#element-${element} .name-poke`).html(firstCapitalLetter(response));
      $(`#element-${element} .name-poke`).data('id', idPokemon);
      $(`#element-${element}`).removeClass('d-none');
    })
    .catch(() => {
      $(`#element-${element}`).addClass('d-none');
    });
}

function loadImage(element, idPokemon) {
  loadImgBastionAPI(idPokemon)
    .then((img) => {
      $(`#element-${element} .img-poke`).attr('src', img);
    })
    .catch(() => {
      loadImgPokeAPI(idPokemon)
        .then((img) => {
          $(`#element-${element} .img-poke`).attr('src', img);
        });
    });
}

function namePokemon(idPokemon) {
  return loadPokemonDataAPI(idPokemon)
    .then((responseJSON) => responseJSON.name);
}
