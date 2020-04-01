/// <reference types="cypress" />

const URL = '127.0.0.1:8080'; 

context('pokedex', () => {
    before(() => {
        cy.visit(URL);
    })

    it('se asegura que se pueda hacer click a un pokemon', () => {
        cy.wait(3000)
        cy.get('#element-4').click();
    })
    
    it('se asegura que se muestre el pokemon seleccionado', () => {
        cy.get('#img-poke').should('exist');
        cy.get('#id-poke').should('exist');
        cy.get('#height-poke').should('exist');
        cy.get('#weight-poke').should('exist');
        cy.get('#ability-1').should('exist');
    })

    it('se asegura que se pueda hacer click en siguiente pokemon', () => {
        cy.get('#next-pokemon').click();
    })

    it('se asegura que se muestre el siguiente pokemon', () => {
        cy.get('#img-poke').should('exist');
        cy.get('#id-poke').should('exist');
        cy.get('#height-poke').should('exist');
        cy.get('#weight-poke').should('exist');
        cy.get('#ability-0').should('exist');
    })

    it('se asegura que se pueda hacer click en volver', () => {
        cy.get('#home-page').click();
        cy.get("#img-18").should('have.attr', 'src');
    })

    it('se asegura que se pueda hacer click en siguiente pagina', () => {
        cy.get('#next-page').click();
        cy.get("#img-18").should('have.attr', 'src');
    })

    it('se asegura que se pueda buscar por id existente', () => {
        cy.wait(3000)
        cy.get('#search-pokemon').type(150);
        cy.get('#search').click();
        cy.get('#img-poke').should('exist');
        cy.get('#id-poke').should('have.text', "ID: 150");
        cy.get('#height-poke').should('have.text', "Altura: 2");
        cy.get('#weight-poke').should('have.text', "Peso: 122kg");
        cy.get('#ability-0').should('have.text', "Nerviosismo:Pone nervioso al rival y le impide\nusar bayas.");
        cy.get('#ability-1').should('have.text', "Presión:Hace que los PP del rival se\nacaben antes.");
    })

    it('se asegura que se pueda buscar por nombre existente', () => {
        cy.get('#search-pokemon').clear().type("CharIzard");
        cy.get('#search').click();
        cy.get('#img-poke').should('exist');
        cy.get('#id-poke').should('have.text', "ID: 6");
        cy.get('#height-poke').should('have.text', "Altura: 1.7");
        cy.get('#weight-poke').should('have.text', "Peso: 90.5kg");
        cy.get('#ability-0').should('have.text', "Poder Solar:Si hace sol, baja los PS, pero\npotencia el At. Esp.");
        cy.get('#ability-1').should('have.text', "Mar Llamas:Potencia los ataques de tipo\nFuego en un apuro.");
        cy.get('#search-pokemon').clear();
    })

    it('se asegura que no se pueda buscar por id inexistente', () => {
        cy.get('#search-pokemon').clear().type(1500);
        cy.get('#search').click();
        cy.get('#img-poke').should('exist');
        cy.get('#id-poke').should('have.text', "ID: 6");
        cy.get('#height-poke').should('have.text', "Altura: 1.7");
        cy.get('#weight-poke').should('have.text', "Peso: 90.5kg");
        cy.get('#ability-0').should('have.text', "Poder Solar:Si hace sol, baja los PS, pero\npotencia el At. Esp.");
        cy.get('#ability-1').should('have.text', "Mar Llamas:Potencia los ataques de tipo\nFuego en un apuro.");
    })

    it('se asegura que no se pueda buscar por nombre inexistente', () => {
        cy.get('#search-pokemon').clear().type("asdf");
        cy.get('#search').click();
        cy.get('#img-poke').should('exist');
        cy.get('#id-poke').should('have.text', "ID: 6");
        cy.get('#height-poke').should('have.text', "Altura: 1.7");
        cy.get('#weight-poke').should('have.text', "Peso: 90.5kg");
        cy.get('#ability-0').should('have.text', "Poder Solar:Si hace sol, baja los PS, pero\npotencia el At. Esp.");
        cy.get('#ability-1').should('have.text', "Mar Llamas:Potencia los ataques de tipo\nFuego en un apuro.");
    })
})
