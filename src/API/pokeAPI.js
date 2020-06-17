export function loadPokemonDataAPI(idOrName) {
  if(idOrName === undefined){
    throw new Error('Se necesita un identificador para buscar la informacion de un pokemon');
  }
  const pokeURL = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
  return fetch(pokeURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Fallo de conexion http al cargar la info del pokemon con ID: ${idPokemon}`);
    });
}

export function loadImgPokeAPI(idPokemon) {
  if(idPokemon === undefined){
    throw new Error('Se necesita un identificador para buscar la imagen de un pokemon');
  }
  const pokeURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
  return fetch(pokeURL)
    .then((response) => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error(`Fallo de conexion http al cargar la imagen del pokemon con ID: ${idPokemon} desde PokeAPI`);
    })
    .then((blob) => URL.createObjectURL(blob));
}

export function loadAbilityAPI(abilityURL){
  if (abilityURL === undefined) {
    throw new Error('Se necesita una URL para buscar info de una habilidad');
  }
  return fetch(abilityURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Fallo de conexion http con la habilidad de URL ${abilityURL}`)
    })
}
