import {
    loadAbilityAPI,
} from '../../../API/pokeAPI.js';

export async function selectAbilitiesLanguages(language, pokemonClass) {
    if (language === undefined || typeof pokemonClass !== 'object'){
        throw new Error('Se necesita un lenguaje y un objeto para definir idioma');
    }
    const abilitiesObject = await accessEachAbilityUrl(language, pokemonClass);
    return abilitiesObject;
}

async function accessEachAbilityUrl(language, pokemon) {
    const quantityOfAbilities = pokemon.abilities.length;
    for (let i = 0; i < quantityOfAbilities; i++) {
        const linkOfAbility = pokemon.abilities[i].ability.url;
        const ability = await loadAbilityAPI(linkOfAbility);
        pokemon.abilities[i] = selectNameLanguage(language, ability);
        pokemon.abilities[i].id = ability.id;
        pokemon.abilities[i].flavor_text = selectFavlorTextEntriesLanguage(language, ability);
    }
    return pokemon
}

function selectNameLanguage(language, ability) {
    const languagesQuantityForName = ability.names.length;
    for (let i = 0; i <= languagesQuantityForName; i++) {
        if (ability.names[i].language.name === language) {
            const abilityName = {
                name: ability.names[i].name,
                language: "es",
            }
            return abilityName;
        }
    }
    for (let i = 0; i <= languagesQuantityForName; i++) {
        if (ability.names[i].language.name === "en") {
            const abilityName = {
                name: ability.names[i].name,
                language: "en",
            }
            return abilityName;
        }
    }
    throw new Error(`Fallo seleccionando el nombre de una habilidad con el idioma: ${language}`);
}

function selectFavlorTextEntriesLanguage(language, ability) {
    const languagesQuantityForFlavorTextEntries = ability.flavor_text_entries.length;
    for (let i = 0; i <= languagesQuantityForFlavorTextEntries; i++) {
        if (ability.flavor_text_entries[i].language.name === language) {
            const abilityName = {
                name: ability.flavor_text_entries[i].flavor_text,
                language: "es",
            }
            return abilityName;
        }
    }
    for (let i = 0; i <= languagesQuantityForFlavorTextEntries; i++) {
        if (ability.flavor_text_entries[i].language.name === "en") {
            const abilityName = {
                name: ability.names[i].flavor_text,
                language: "en",
            }
            return abilityName;
        }
    }
    throw new Error(`Fallo seleccionando la info de una habilidad con el idioma: ${language}`);
}
