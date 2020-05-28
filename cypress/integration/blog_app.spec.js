import cy from 'Cypress'

describe('Note app', function() {
  const user = {
    name: 'Sam',
    username: 'Sam123',
    password: 'password123'
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
    cy.get('html').should('not.contain', 'Add a blog')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Sam logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type(`${user.username} error`)
      cy.get('#password').type(`${user.password} error`)
      cy.get('#login-button').click()

      cy.get('.error')
       .should('contain', 'Wrong username or password')
       .and('have.css', 'color', 'rgb(255, 0, 0)')
       .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Sam logged in')
    })
  })

  describe('When logged in', function() {
    const blog = {
      author: 'Test author',
      url: 'www.example.com',
      title: 'Test title',
      likes: 7
    }
    beforeEach(function() {
      cy.login({username: user.username, password: user.password})
      cy.createBlog(blog)
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#author').type('blog.author')
      cy.get('#url').type('blog.url')
      cy.get('#likes').type(5)
      cy.get('#title').type('blog.title')
      cy.get('#new-blog-button').click()
      cy.get('.blog-title').should('contain', 'blog.title')
    })

    it('A blog can be liked', function() {
      cy.contains('View').click()
      cy.get('.blog-like-button').click()
      cy.get('.blog-likes').should('contain', blog.likes + 1)
    })

    it('can be deleted if it is the users blog', function() {
      cy.contains('View').click()
      cy.contains('Delete post').click()
      cy.get('.blog-title').should('not.contain', 'blog.title')
    })

    it('cannot be deleted if it is not the users blog', function() {
      cy.contains('Log out').click()
      cy.contains('View').click()
      cy.get('.blog-delete-button').should('not.contain', 'Delete post')
    })

    it.only('orders blogs by number of likes', function() {
      cy.createBlog(({...blog, likes: blog.likes + 1 }))
      cy.createBlog(({...blog, likes: blog.likes + 2 }))
      cy.get('.blog-wrapper').find('.blog-show-button').click({multiple: true})
      cy.get('.blog-details').find('.blog-like')
        .each((span, index, collection) => {
          const value = Number(span.text())
          const previousValue = Number(collection.eq(index + 1).text())
          if(previousValue > 0 && previousValue !== null) {
            expect(value).to.be.greaterThan(previousValue)
          }
      })
    })
  })

})
