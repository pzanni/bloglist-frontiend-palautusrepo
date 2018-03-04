import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      newBlog: null,
      newAuthor: '',
      newTitle: '',
      newUrl: '',
      showForm: false
    }
  }

  componentDidMount() {
    function compareLikes(a, b) {
      return b.likes - a.likes;
    }
    blogService.getAll().then(blogs => {
      let sortedBlogs = blogs.sort(compareLikes)
      this.setState({ blogs: sortedBlogs })
    })
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
      blogService.setToken(user.token);
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

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: this.state.newAuthor,
      title: this.state.newTitle,
      url: this.state.newUrl,
      user: this.state.user
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        console.log(newBlog)
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newAuthor: '',
          newTitle: '',
          newUrl: ''
        })
      })
  }

  logout = async (event) => {
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
  }


  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleShowForm = (event) => {
    let showFormValue = this.state.showForm;
    this.setState({ showForm: !showFormValue })
  }

  render() {
    const loginForm = () => (
      <div className="loginForm">
        <h2>Log in to application</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    );
    const loggedInView = () => (
      <div className="loggedInView">
        <p>Logged in as {this.state.user.name} <button onClick={this.logout}>Logout</button> </p>
        {console.log(this.state.user)}
        {blogForm()}

        <h2>Blogs</h2>
        {
          this.state.blogs.map(blog =>
            <div>
              <Blog key={blog._id} blog={blog} userLoggedIn={this.state.user} />
            </div>
          )
        }
      </div>
    )

    const blogForm = () => (
      <div>
        {this.state.showForm ? (
          <div>
            <h2>Create new blog</h2>
            <form onSubmit={this.addBlog}>
              <p>Author: </p>
              <input
                type="text"
                name="newAuthor"
                value={this.state.newAuthor}
                onChange={this.handleFieldChange}
              />
              <p>Title: </p>
              <input
                value={this.state.newTitle}
                name="newTitle"
                onChange={this.handleFieldChange}
              />
              <p>URL: </p>
              <input
                value={this.state.newUrl}
                name="newUrl"
                onChange={this.handleFieldChange}
              />
              <div class="buttons">
                <button type="submit">tallenna</button>
              </div>
            </form>
            <button onClick={this.toggleShowForm}>Dont add new blog</button>
          </div>
        ) : (
            <button onClick={this.toggleShowForm}>Add new blog</button>
          )}
      </div>
    )

    return (
      <div className="content">
        <Notification message={this.state.error} />
        {this.state.user === null && loginForm()}
        {this.state.user !== null && loggedInView()}
      </div>
    )
  }

}

const Notification = ({ message }) => (
  <div className="error">
    {message}
  </div>
)


export default App;
