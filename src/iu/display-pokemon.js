import { changePage } from '../tabla-pokemones/tabla.js';
import { firstCapitalLetter, searchBlobImgSrc } from '../utilidades/utilidades.js';
import {
  loadImgPokeAPI,
  nameAbilityPokemonAPI,
  dataAbilityPokemonAPI,
} from '../API/pokeAPI.js';
import { loadImgBastionAPI } from '../API/bastionbotAPI.js';

export function displayPokemonInfo() {
  $('#pokemons-container').addClass('d-none');
  $('#pokemon-container').removeClass('d-none');
  $('#page-number-buttons').addClass('d-none');
  $('#pokemon-number-buttons').removeClass('d-none');
}

export function loadPokemonIU(idPokemon, responseJSON) {
  const namePokemon = responseJSON.name;
  const numberAbilities = responseJSON.abilities.length;
  $('#pokemons-container').data('selected-pokemon-id', idPokemon);
  $('#pokemons-container').data('selected-pokemon-name', namePokemon);
  const closeButton = $('#close-button')[0];
  if (!(typeof closeButton === 'undefined')) {
    closeButton.click();
  }
  changePage(idPokemon);
  changeIcon(idPokemon);
  displayName(responseJSON.name);
  displayImages(idPokemon);
  displayId(idPokemon);
  displayHeight(responseJSON.height);
  displayWeight(responseJSON.weight);
  displayNumberAbilities(numberAbilities);
  responseJSON.abilities.forEach((_ability, i) => {
    const abilityName = responseJSON.abilities[i].ability.url;
    const abilityInfo = responseJSON.abilities[i].ability.url;
    displayAbilities(abilityName, abilityInfo, i);
  });
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

function displayAbilityInfo(abilityInfoUrl, i) {
  dataAbilityPokemonAPI(abilityInfoUrl)
    .then((info) => {
      $(`#ability-${i}`).append($(`<p class="mb-0">${info}</p>`));
    });
}

function displayAbilities(abilityNameUrl, abilityInfoUrl, i) {
  nameAbilityPokemonAPI(abilityNameUrl)
    .then((name) => {
      $('#abilities-info').append($(`<li class="list-group-item" id="ability-${i}">${firstCapitalLetter(name)}:</li>`));
      displayAbilityInfo(abilityInfoUrl, i);
    });
}
