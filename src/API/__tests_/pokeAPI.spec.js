/// <reference types="jest"/>

import {
    loadPokemonDataAPI,
    nameAbilityPokemonAPI,
    dataAbilityPokemonAPI,
} from '../pokeAPI.js';

beforeEach(() => {
    global.fetch = jest.fn();
})

test('carga la informacion de un pokemon', () => {
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
            r({});
        })
        resolve({ json: () => jsonPromise });
    }))
    const idPokemon = 3;
    loadPokemonDataAPI(idPokemon);
    expect(global.fetch)
        .toHaveBeenCalledTimes(1);
    expect(global.fetch)
        .toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
})

test('cargar la informacion de un pokemon sin id da error', () => {
    expect(loadPokemonDataAPI())
        .rejects
        .toEqual(new Error('Se necesita un identificador para buscar la informacion de un pokemon'))

    expect(global.fetch)
        .toHaveBeenCalledTimes(0)
})

test('carga el nombre de la habilidad', () => {
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
            r({});
        })
        resolve({ json: () => jsonPromise });
    }))
    const abilityUrl = 'hola.com/ability';
    nameAbilityPokemonAPI(abilityUrl);
    expect(global.fetch)
        .toHaveBeenCalledTimes(1);
    expect(global.fetch)
        .toHaveBeenCalledWith(abilityUrl);
})

test('cargar el nombre de la habilidad sin la url da error', () => {
    expect(nameAbilityPokemonAPI())
        .rejects
        .toEqual(new Error('Se necesita una url para buscar el nombre de la habilidad de un pokemon'))
})

test('carga la informarcion de la habilidad', () => {
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
            r({});
        })
        resolve({ json: () => jsonPromise });
    }))
    const abilityInfoUrl = 'hola.com/ability';
    dataAbilityPokemonAPI(abilityInfoUrl);
    expect(global.fetch)
        .toHaveBeenCalledTimes(1);
    expect(global.fetch)
        .toHaveBeenCalledWith(abilityInfoUrl);
})

test('cargar la informacion de la habilidad sin la url da error', () => {
    expect(dataAbilityPokemonAPI())
        .rejects
        .toEqual(new Error('Se necesita una url para buscar la informacion de la habilidad de un pokemon'))
})