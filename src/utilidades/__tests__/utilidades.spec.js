/// <reference types="jest" />

import {firstCapitalLetter} from '../utilidades.js';

describe('utilidades', () => {
    it('deberia pasar la primera letra a mayuscula', () => {
        expect(firstCapitalLetter('prueba')).toEqual('Prueba');
    });
});