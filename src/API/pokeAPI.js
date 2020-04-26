export function loadPokemonDataAPI(idPokemon) {
  const pokeURL = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
  return fetch(pokeURL)
    .then((response) => {
      if (!(response.status === 200)) {
        throw false;
      }
      return response.json();
    });
}

export function loadImgPokeAPI(idPokemon) {
  const pokeURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
  return fetch(pokeURL)
    .then((response) => {
      if (response.status === 200) {
        return response.blob();
      }
      throw false;
    })
    .then((blob) => URL.createObjectURL(blob));
}

export function nameAbilityPokemonAPI(abilityNameURL) {
  return fetch(abilityNameURL)
    .then((response) => response.json())
    .then((responseJSON) => responseJSON.names[4].name)
    .catch((error) => {
      console.error('FALLÓ MOSTRAR NOMBRE HABILIDAD', error);
    });
}

export function dataAbilityPokemonAPI(abilityInfoURL) {
  return fetch(abilityInfoURL)
    .then((response) => response.json())
    .then((responseJSON) => responseJSON.flavor_text_entries[23].flavor_text)
    .catch(() => fetch(URL)
      .then((response) => response.json())
      .then((responseJSON) => responseJSON.effect_entries[0].effect)
      .catch((error) => console.error('FALLÓ MOSTRAR INFO HABILIDADES', error)));
}
