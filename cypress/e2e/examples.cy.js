describe('Various examples', () => {
  beforeEach(() => {
    cy.visit('/examples');
  });
  it('multi-page testing', () => {
    cy.getDataTest('nav-why-cypress').click();
    cy.location('pathname').should('equal', '/');

    cy.getDataTest('nav-overview').click();
    cy.location('pathname').should('equal', '/overview');

    cy.getDataTest('nav-fundamentals').click();
    cy.location('pathname').should('equal', '/fundamentals');

    cy.getDataTest('nav-forms').click();
    cy.location('pathname').should('equal', '/forms');

    cy.getDataTest('nav-components').click();
    cy.location('pathname').should('equal', '/component');

    cy.getDataTest('nav-best-practices').click();
    cy.location('pathname').should('equal', '/best-practices');
  });

  it('intercepts', () => {
    cy.intercept('POST', 'http://localhost:3000/examples', {
      // body: {
      //   message: 'successfully intercepted request',
      // },
      fixture: 'example.json',
    });
    cy.getDataTest('post-button').click();
  });

  it.only('grudges', () => {
    // cy.pause();
    cy.contains(/Add Some Grudges/i);

    // Empty list
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });
    cy.getDataTest('clear-button').should('not.exist');

    cy.getDataTest('grudge-list-title').should('have.text', 'Add Some Grudges');

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('some grudge');
    });
    cy.getDataTest('add-grudge-button').click();

    // 1 List item
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1);
    });
    cy.getDataTest('grudge-list-title').should('have.text', 'Grudges');

    // 2 List Item
    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('some other grudge');
    });
    cy.getDataTest('add-grudge-button').click();
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 2);
      cy.get('li').its(0).should('contains.text', 'some grudge');
    });

    // Delete

    // Click delete button
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li')
        .its(0)
        .within(() => {
          cy.get('button').click();
        });
    });

    // Check length = 1
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1);
    });

    // Clear all
    cy.getDataTest('clear-button').click();
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });
  });
});
