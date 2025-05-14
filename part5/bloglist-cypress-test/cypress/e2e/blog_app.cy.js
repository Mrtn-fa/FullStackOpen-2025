describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'user',
      password: 'password'
    }
    const user2 = {
      name: 'Test User 2',
      username: 'user2',
      password: 'password'
    }
    cy.createUser(user)
    cy.createUser(user2)
  })
  it('front page can be opened', function () {
    cy.get('#login-form').should('exist')
  })
  it('login to the app', function () {
    cy.get('#username').type('user')
    cy.get('#password').type('password')
    cy.contains('login').click()
    cy.contains('Test User logged in')
  })
  it('wrong login credentials', function () {
    cy.get('#username').type('user')
    cy.get('#password').type('wrongPassword')
    cy.contains('login').click()
    cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user', password: 'password' })
    })
    it('Create new blog entry', function () {
      cy.contains('new blog').click()

      cy.get('#blog-title').type('New blog Title')
      cy.get('#blog-author').type('New blog Author')
      cy.get('#blog-url').type('New blog URL')
      cy.get('#blog-submit').click()

      cy.get('.success')
        .should('contain', 'a new blog New blog Title by New blog Author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('.blog-data').contains('New blog Title')
      cy.get('.blog-data').contains('New blog Author')
    })

    describe('A blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: "TEST BLOG", author: "TEST AUTHOR", url: 'https://example.com' })
      })
      it('like a blog', function () {
        cy.get('.blog-data').contains('show').click()
        cy.get('.blog-data').contains('like').click()
        cy.contains('likes 1')
        cy.get('.blog-data').contains('like').click()
        cy.contains('likes 2')
      })
      it('delete a blog', function () {
        cy.get('.blog-data').contains('show').click()
        cy.get('.blog-data').should('contain', 'delete')
        cy.get('.blog-data').contains('delete').click()
        cy.get('.blog-data').should('not.exist')
      })

      describe('when im not the user that created the blog', function () {
        beforeEach(function () {
          cy.logout()
          cy.login({ username: 'user2', password: 'password' })
        })
        it('like the blog', function () {
          cy.get('.blog-data').contains('show').click()
          cy.get('.blog-data').contains('like').click()
          cy.contains('likes 1')
          cy.get('.blog-data').contains('like').click()
          cy.contains('likes 2')
        })
        it('cannot delete the blog', function () {
          cy.get('.blog-data').contains('show').click()
          cy.get('.blog-data').should('not.contain', 'delete')
        })
      })
    })

    describe('More than one blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: "Third blog with most likes", author: "TEST AUTHOR", url: 'https://example.com' })
        cy.createBlog({ title: "Second blog with most likes", author: "TEST AUTHOR", url: 'https://example.com' })
        cy.createBlog({ title: "First blog with most likes", author: "TEST AUTHOR", url: 'https://example.com' })
      })
      it('blogs order by most likes', function () {
        cy.get('.blog-data').contains('First blog with most likes').parent().as("firstBlog")
        cy.get('.blog-data').contains('Second blog with most likes').parent().as("secondBlog")
        cy.get('.blog-data').contains('Third blog with most likes').parent().as("thirdBlog")

        cy.get('@firstBlog').contains('show').click()
        cy.get('@firstBlog').find('.like-blog').click()
        cy.get('@firstBlog').find('.like-blog').click()
        cy.get('@firstBlog').find('.like-blog').click()

        cy.get('@secondBlog').contains('show').click()
        cy.get('@secondBlog').find('.like-blog').click()
        cy.get('@secondBlog').find('.like-blog').click()

        cy.get('@thirdBlog').contains('show').click()
        cy.get('@thirdBlog').find('.like-blog').click()

        cy.get('.blog-data').eq(0).should('contain', 'First blog with most likes')
        cy.get('.blog-data').eq(1).should('contain', 'Second blog with most likes')
        cy.get('.blog-data').eq(2).should('contain', 'Third blog with most likes')

      })
    })
  })
})