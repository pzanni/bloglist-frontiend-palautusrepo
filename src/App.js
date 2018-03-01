import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      // blogService.setToken(user.token);
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
  }


  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    );
    const loggedInView = () => (
      <div>
        <p>Logged in as {this.state.user.name} <button onClick={this.logout}>Logout</button> </p>
        <h2>Blogs</h2>
        {
          this.state.blogs.map(blog =>
            <Blog key={blog._id} blog={blog} />
          )
        }
      </div>
    )

    if (this.state.user === null) {
      return (
        <div>
          {loginForm()}
        </div>
      )
    } else {
      return (
        <div>
          {loggedInView()}
        </div>
      )
    }
  }
}

export default App;
