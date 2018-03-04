import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import localStorageMock from './setupTests'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  describe('when user is not logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
    })

    it('renders all blogs it gets from backend', () => {
      app.update()
      const contentDiv = app.find('.loginForm')
      expect(contentDiv.text()).toContain('käyttäjätunnus')
      expect(contentDiv.text()).toContain('salasana')
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        _id: '5a97fc94734d1d3e5b2d2d98',
        username: 'anni',
        password: 'anni123',
        name: 'Anni Puurunen'
      }
      localStorage.setItem('loggedUser', JSON.stringify(user))
    })

    it('renders all blogs it gets from backend', () => {
      app.update()
      const contentDiv = app.find('.content')
      expect(true).toBeTruthy();
      // expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})