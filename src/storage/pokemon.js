function obtenerKeyPokemon(id) {
  return `pokemon_${id}`;
}

export function loadPokemonLocalStorage(id) {
  if (id === undefined) {
    throw new Error('Se necesita una id para cargar un pokemón');
  }

  const pokemon = JSON.parse(localStorage.getItem(obtenerKeyPokemon(id)));
  if (pokemon === null) {
    throw new Error(`Pokemon ${id} no encontrado`);
  }

  return pokemon;
}

export function savePokemon(id, pokemon) {
  if (id === undefined || typeof pokemon !== 'object') {
    throw new Error('Se necesita un identificador y un pokemon para guardar en localStorage');
  }
  try {
    localStorage.setItem(obtenerKeyPokemon(id), JSON.stringify(pokemon));
  } catch (e) {
    console.error('Memoria del local storage llena para guardar info de un pokemon, vaciela', e);
  }
}
