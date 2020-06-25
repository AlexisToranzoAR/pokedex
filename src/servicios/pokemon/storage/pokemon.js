function obtenerKeyPokemon(idOrName, language) {
  return `pokemon_${idOrName}_${language}`;
}

export function loadPokemonLocalStorage(idOrName, language) {
  if (idOrName === undefined || language === undefined) {
    throw new Error('Se necesita una id para cargar un pokemón');
  }

  const pokemon = JSON.parse(localStorage.getItem(obtenerKeyPokemon(idOrName, language)));
  if (pokemon === null) {
    throw new Error(`Pokemon ${idOrName} con el idioma ${language} no encontrado`);
  }

  return pokemon;
}

export function savePokemon(idOrName, pokemon, language) {
  if (idOrName === undefined || typeof pokemon !== 'object' || language === undefined) {
    throw new Error('Se necesita un identificador, un pokemon y un idioma para guardar en localStorage');
  }
  try {
    localStorage.setItem(obtenerKeyPokemon(idOrName, language), JSON.stringify(pokemon));
  } catch (e) {
    localStorage.clear();
    console.error('Memoria del local storage llena esta fue vaciada en su totalidad', e);
  }
}
