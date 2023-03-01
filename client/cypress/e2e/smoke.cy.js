describe('Smoke Test', () => {
  it('can view the home page', () => {
    cy.visit('/');
    cy.contains('Join Event');
    cy.contains('Add Event');
    cy.contains('Add Run');
    cy.contains('Add Friend');
    
  });
});
