/* eslint-disable no-undef */
describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user={
        name:'abel alem',
        username:'abel',
        password:'1234'
    }
    cy.request('POST','http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      // ...
      
    })
    describe('Login',function() {
        
        it('succeeds with correct credentials', function() {
          // ...
          cy.contains('login').click()
      cy.get('input:first').type('abel')
      cy.get('input:last').type('1234')
      cy.get('#login-button').click()
      cy.contains('abel alem logged in')
        })
    
        it('fails with wrong credentials', function() {
          // ...
          cy.contains('login').click()
          cy.get('input:first').type('abel')
          cy.get('input:last').type('wrong')
          cy.get('#login-button').click()
          cy.contains('wrong username or password')
          cy.get('.error')
              .should('contain', 'wrong username or password')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
              .and('have.css', 'border-style', 'solid')
        })
      })
      describe('When logged in', function() {
        beforeEach(function() {
          // log in user here
          cy.contains('login').click()
          cy.get('input:first').type('abel')
          cy.get('input:last').type('1234')
          cy.get('#login-button').click()
        })
    
        it('A blog can be created', function() {
          // ...
            cy.contains('create new blog').click()
            cy.get('#one').type('abebe')
            cy.get('#two').type('avatar')
            cy.get('#three').type('avatar.com')
            cy.get('#four').type(23)
            cy.contains('#create-button').click()
            cy.contains('abebe')
        })
        it('a user can like',async function(){
            cy.contains('view').click()
           
            cy.contains('like').click()
          
        })
    
        it('title with most likes',function(){
            cy.get('.blog').eq(0).should('contain',  'The title with the most likes')
            cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')

        })
    })
  })