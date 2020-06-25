/// <reference types="cypress" />

const URL = '127.0.0.1:8080';

context('pokedex', () => {
  let fetchPolyfill;

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
      .then((response) => {
        fetchPolyfill = response.body;
      });
    
    mockPrimeraPagina();
    
    cy.visit(URL, {
      onBeforeLoad(contentWindow) {
        delete contentWindow.fetch;
        contentWindow.eval(fetchPolyfill);
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });
  
  it('se asegura que se pueda hacer click a un pokemon', () => {
    cy.get('#element-4 > .figure-caption').click();
  });

  it('se asegura que se muestre el pokemon seleccionado', () => {
    cy.get('#img-poke').should('exist');
    cy.get('#id-poke').should('have.text', 'ID: 4');
    cy.get('#height-poke').should('have.text', 'Altura: 0.6m');
    cy.get('#weight-poke').should('have.text', 'Peso: 8.5kg');
    cy.get('#ability-0').should('have.text', 'Poder Solar:Si hace sol, baja los PS, pero\npotencia el At. Esp.');
    cy.get('#ability-1').should('have.text', 'Mar Llamas:Potencia los ataques de tipo\nFuego en un apuro.');
  });

  it('se asegura que se pueda hacer click en siguiente pokemon', () => {
    cy.get('#next-pokemon').click();
  });

  it('se asegura que se muestre el siguiente pokemon', () => {
    cy.get('#img-poke').should('exist');
    cy.get('#id-poke').should('exist');
    cy.get('#height-poke').should('exist');
    cy.get('#weight-poke').should('exist');
    cy.get('#ability-0').should('exist');
  });

  it('se asegura que se pueda hacer click en volver', () => {
    cy.get('#home-page').click();
    cy.get('#img-18').should('have.attr', 'src');
  });

  it('se asegura que se pueda hacer click en siguiente pagina', () => {
    mockSegundaPagina();
    cy.get('#next-page').click();
    cy.get('#img-18').should('have.attr', 'src');
  });

  it('se asegura que se pueda buscar por id existente', () => {
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/150', 'fixture:fetchs-pokemon/150');

    cy.get('#search-pokemon').type(150);
    cy.get('#search').click();

    cy.wait(3000);

    cy.get('#img-poke').should('exist');
    cy.get('#id-poke').should('have.text', 'ID: 150');
    cy.get('#height-poke').should('have.text', 'Altura: 2m');
    cy.get('#weight-poke').should('have.text', 'Peso: 122kg');
    cy.get('#ability-0').should('have.text', 'Nerviosismo:Pone nervioso al rival y le impide\nusar bayas.');
    cy.get('#ability-1').should('have.text', 'Presión:Hace que los PP del rival se\nacaben antes.');
  });

  it('se asegura que se pueda buscar por nombre existente', () => {
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/charizard', 'fixture:fetchs-pokemon/6');

    cy.get('#search-pokemon').clear().type('CharIzard');
    cy.get('#search').click();
    cy.get('#img-poke').should('exist');
    cy.get('#id-poke').should('have.text', 'ID: 6');
    cy.get('#height-poke').should('have.text', 'Altura: 1.7m');
    cy.get('#weight-poke').should('have.text', 'Peso: 90.5kg');
    cy.get('#ability-0').should('have.text', 'Poder Solar:Si hace sol, baja los PS, pero\npotencia el At. Esp.');
    cy.get('#ability-1').should('have.text', 'Mar Llamas:Potencia los ataques de tipo\nFuego en un apuro.');
    cy.get('#search-pokemon').clear();
  });

  it('se asegura que no se pueda buscar por id inexistente', () => {
    cy.get('#search-pokemon').clear().type(1500);
    cy.get('#search').click();
    cy.get('.alert strong').should('have.text', 'Pokemon "1500" no encontrado,');
  });

  it('se asegura que no se pueda buscar por nombre inexistente', () => {
    cy.get('#search-pokemon').clear().type('asdf');
    cy.get('#search').click();
    cy.get('.alert strong').should('have.text', 'Pokemon "asdf" no encontrado,');
  });
});

function mockPrimeraPagina () {
  cy.server();
  cy.route('https://pokeapi.co/api/v2/pokemon/1', 'fixture:fetchs-pokemon/1');
  cy.route('https://pokeapi.co/api/v2/pokemon/2', 'fixture:fetchs-pokemon/2');
  cy.route('https://pokeapi.co/api/v2/pokemon/3', 'fixture:fetchs-pokemon/3');
  cy.route('https://pokeapi.co/api/v2/pokemon/4', 'fixture:fetchs-pokemon/4');
  cy.route('https://pokeapi.co/api/v2/pokemon/5', 'fixture:fetchs-pokemon/5');
  cy.route('https://pokeapi.co/api/v2/pokemon/6', 'fixture:fetchs-pokemon/6');
  cy.route('https://pokeapi.co/api/v2/pokemon/7', 'fixture:fetchs-pokemon/7');
  cy.route('https://pokeapi.co/api/v2/pokemon/8', 'fixture:fetchs-pokemon/8');
  cy.route('https://pokeapi.co/api/v2/pokemon/9', 'fixture:fetchs-pokemon/9');
  cy.route('https://pokeapi.co/api/v2/pokemon/10', 'fixture:fetchs-pokemon/10');
  cy.route('https://pokeapi.co/api/v2/pokemon/11', 'fixture:fetchs-pokemon/11');
  cy.route('https://pokeapi.co/api/v2/pokemon/12', 'fixture:fetchs-pokemon/12');
  cy.route('https://pokeapi.co/api/v2/pokemon/13', 'fixture:fetchs-pokemon/13');
  cy.route('https://pokeapi.co/api/v2/pokemon/14', 'fixture:fetchs-pokemon/14');
  cy.route('https://pokeapi.co/api/v2/pokemon/15', 'fixture:fetchs-pokemon/15');
  cy.route('https://pokeapi.co/api/v2/pokemon/16', 'fixture:fetchs-pokemon/16');
  cy.route('https://pokeapi.co/api/v2/pokemon/17', 'fixture:fetchs-pokemon/17');
  cy.route('https://pokeapi.co/api/v2/pokemon/18', 'fixture:fetchs-pokemon/18');
}

function mockSegundaPagina () {
  cy.server();
  cy.route('https://pokeapi.co/api/v2/pokemon/19', 'fixture:fetchs-pokemon/19');
  cy.route('https://pokeapi.co/api/v2/pokemon/20', 'fixture:fetchs-pokemon/20');
  cy.route('https://pokeapi.co/api/v2/pokemon/21', 'fixture:fetchs-pokemon/21');
  cy.route('https://pokeapi.co/api/v2/pokemon/22', 'fixture:fetchs-pokemon/22');
  cy.route('https://pokeapi.co/api/v2/pokemon/23', 'fixture:fetchs-pokemon/23');
  cy.route('https://pokeapi.co/api/v2/pokemon/24', 'fixture:fetchs-pokemon/24');
  cy.route('https://pokeapi.co/api/v2/pokemon/25', 'fixture:fetchs-pokemon/25');
  cy.route('https://pokeapi.co/api/v2/pokemon/26', 'fixture:fetchs-pokemon/26');
  cy.route('https://pokeapi.co/api/v2/pokemon/27', 'fixture:fetchs-pokemon/27');
  cy.route('https://pokeapi.co/api/v2/pokemon/28', 'fixture:fetchs-pokemon/28');
  cy.route('https://pokeapi.co/api/v2/pokemon/29', 'fixture:fetchs-pokemon/29');
  cy.route('https://pokeapi.co/api/v2/pokemon/30', 'fixture:fetchs-pokemon/30');
  cy.route('https://pokeapi.co/api/v2/pokemon/31', 'fixture:fetchs-pokemon/31');
  cy.route('https://pokeapi.co/api/v2/pokemon/32', 'fixture:fetchs-pokemon/32');
  cy.route('https://pokeapi.co/api/v2/pokemon/33', 'fixture:fetchs-pokemon/33');
  cy.route('https://pokeapi.co/api/v2/pokemon/34', 'fixture:fetchs-pokemon/34');
  cy.route('https://pokeapi.co/api/v2/pokemon/35', 'fixture:fetchs-pokemon/35');
  cy.route('https://pokeapi.co/api/v2/pokemon/36', 'fixture:fetchs-pokemon/36');
}