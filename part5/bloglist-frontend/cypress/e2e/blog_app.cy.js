describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('create new blog').click()
      cy.get('#title-input').type('SICP')
      cy.get('#author-input').type('Hal Abelson')
      cy.get('#url-input').type('sicp.com')
      cy.get('#create-button').click()
      cy.contains('view').click()
    })

    it('A blog can be created', function() {
      cy.contains('SICP Hal Abelson')
      cy.contains('sicp.com')
    })

    it('User can like a blog', function() {
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('User who created a blog can remove the blog', function() {
      cy.get('#remove-button').click()
      cy.reload()
      cy.contains('SICP Hal Abelson').should('not.exist')
    })

    it.only('Other users cannot delete the blog', function() {
      const user = {
        name: 'Gilberdi Sinaga',
        username: 'sngbd',
        password: 'badpassword'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.contains('logout').click()
      cy.get('#username').type('sngbd')
      cy.get('#password').type('badpassword')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.get('#remove-button').should('not.exist')
    })
  })
})