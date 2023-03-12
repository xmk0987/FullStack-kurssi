describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Lahna',
      username: 'Matti',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
  })

  

  it('login form can be opened', function() {
    cy.contains('login').click()
  })
})