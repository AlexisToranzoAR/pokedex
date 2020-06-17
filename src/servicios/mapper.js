class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.height = data.height;
        this.weight = data.weight;
        this.abilities = data.abilities;
        this.species = data.species;
        this.sprites = data.sprites;
        this.stats = data.stats;
        this.types = data.types;
    }
}

export function mapearPokemon(pokemonAPI) {
    const pokemonClass = new Pokemon(pokemonAPI);
    return pokemonClass;
}