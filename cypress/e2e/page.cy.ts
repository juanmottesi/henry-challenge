describe('Homepage', () => {
  it('empty page', () => {
    cy.visit('');
    cy.get('h1').contains('Golf Leaderboard');

    cy.get('#Tour')    
    cy.get('#Season')

    cy.get('table');

    cy.contains('Select tournament and season.')
  });

  it('select tour and season', () => {
    cy.visit('');
    cy.get('h1').contains('Golf Leaderboard');

    cy.get('#Tour').click();
    cy.contains('option')
    cy.get('[id$=option-0]').click();

    cy.get('#Season').click();
    cy.contains('option');
    cy.get('[id$=option-0]').click();

    cy.get('.table').find('tr');
  });
});
