describe('Https Request',()=>{

    it('GET call',()=>{
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .its('status')
        .should('equal',200);
    })

})