import { changePage } from './tabla-pokemons/tabla.js';
import { firstCapitalLetter, searchBlobImgSrc } from '../utilidades/utilidades.js';
import {
  loadImgPokeAPI,
} from '../API/pokeAPI.js';
import { loadImgBastionAPI } from '../API/bastionbotAPI.js';

export function displayPreloadEnvironment() {
  $('#pokemons-container').addClass('d-none');
  $('#pokemon-container').removeClass('d-none');
  $('#page-number-buttons').addClass('d-none');
  $('#pokemon-number-buttons').removeClass('d-none');
  $('#abilities-info').empty();
  $('h1').html('Cargando...');
  $('#img-poke').attr('src', './src/gifs/pokemon-loading.gif');
}

export function loadPokemonIU(pokemonClass) {
  const numberAbilities = pokemonClass.abilities.length;
  $('#pokemons-container').data('selected-pokemon-id', pokemonClass.id);
  $('#pokemons-container').data('selected-pokemon-name', pokemonClass.name);
  const closeButton = $('#close-button')[0];
  if (!(typeof closeButton === 'undefined')) {
    closeButton.click();
  }
  changePage(pokemonClass.id);
  changeIcon(pokemonClass.id);
  displayName(pokemonClass.name);
  displayImages(pokemonClass.id);
  displayId(pokemonClass.id);
  displayHeight(pokemonClass.height);
  displayWeight(pokemonClass.weight);
  displayNumberAbilities(numberAbilities);
  displayAbilities(pokemonClass.abilities, numberAbilities);
}

function changeIcon(idPokemon) {
  const imgSrc = searchBlobImgSrc(idPokemon);
  if (imgSrc === '') {
    loadImgBastionAPI(idPokemon)
      .then((img) => {
        $('#icon').attr('href', img);
      })
      .catch((e) => {
        console.error(`FALLO CARGAR ICON POKEMON "${idPokemon}" CON BASTION API`, e);
        loadImgPokeAPI(idPokemon)
          .then((img) => {
            $('#icon').attr('href', img);
          })
          .catch((error) => {
            console.error(`FALLO CARGAR ICON POKEMON "${idPokemon}" CON POKE API`, error);
          });
      });
  } else {
    $('#icon').attr('href', imgSrc);
  }
}

function displayName(name) {
  $('h1').html(firstCapitalLetter(name));
}

function displayImages(idPokemon) {
  const imgSrc = searchBlobImgSrc(idPokemon);
  if (imgSrc === '') {
    loadImgBastionAPI(idPokemon)
      .then((img) => {
        $('#img-poke').attr('src', img);
      })
      .catch((e) => {
        // console.error(`FALLO CARGAR IMAGEN POKEMON "${idPokemon}" CON BASTION API`, e);
        loadImgPokeAPI(idPokemon)
          .then((img) => {
            $('#img-poke').attr('src', img);
          });
        // .catch((error) => console.error(`FALLO CARGAR IMAGEN POKEMON "${idPokemon}" CON POKE API`, error));
      });
  } else {
    $('#img-poke').attr('src', imgSrc);
  }
}

function displayId(idPokemon) {
  $('#id-poke').html(`ID: ${idPokemon}`);
}

function displayHeight(height) {
  $('#height-poke').html(`Altura: ${height / 10}m`);
}

function displayWeight(weight) {
  $('#weight-poke').html(`Peso: ${weight / 10}kg`);
}

function displayNumberAbilities(number) {
  $('#abilities').html('Habilidades ');
  $('#abilities').append($(`<span class="badge badge-primary badge-pill">${number}</span>`));
}

function displayAbilities(abilities, numberAbilities) {
  for (let i=0; i<numberAbilities; i++){
    const nameAbility = abilities[i].name;
    const flavorTextAbility = abilities[i].flavor_text.name;
    $('#abilities-info').append($(`<li class="list-group-item" id="ability-${i}">${firstCapitalLetter(nameAbility)}:</li>`));
    $(`#ability-${i}`).append($(`<p class="mb-0">${flavorTextAbility}</p>`));
  }
}
