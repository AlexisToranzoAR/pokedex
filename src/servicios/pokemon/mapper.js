import Pokemon from './entidades/pokemon.js';

export function mapearPokemon(pokemonAPI) {
    const pokemonClass = new Pokemon(pokemonAPI);
    return pokemonClass;
}