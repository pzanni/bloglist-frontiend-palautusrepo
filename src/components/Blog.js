import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import './Blog.css'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      blog: this.props.blog,
      showInfo: false,
      deleted: false,
      creatorLoggedIn: null,
      userLoggedIn: this.props.userLoggedIn
    };
    this.toggleShowInfo = this.toggleShowInfo.bind(this);
  }

  componentDidMount() {
    if (this.state.userLoggedIn && this.state.blog.user) {
      const userId = this.state.userLoggedIn._id
      const blogUserId = this.state.blog.user._id
      if (userId === blogUserId) {
        this.setState({ creatorLoggedIn: true })
      }
    } else if (this.state.blog.user === null) {
      this.setState({ creatorLoggedIn: true })
    }
  }

  toggleShowInfo(event) {
    this.setState({ showInfo: !this.state.showInfo })
  }

  saveBlog = async () => {
    const response = await blogService.update(this.state.blog);
    console.log(response);
  }

  deleteBlog = async () => {
    const response = await blogService.remove(this.state.blog)
    this.setState({ deleted: true })
  }

  render = () => {
    const blogInfo = () => (
      <div className="blogInfo" class="blogInfo">
        <div>
          Likes: {this.state.blog.likes}
          <button onClick={likeBlog}>Like</button>
        </div>
        <div>
          Url: {this.state.blog.url}
        </div>
        {this.state.creatorLoggedIn && deleteButton()}
      </div>
    )

    const deleteButton = () => (
      <button onClick={this.deleteBlog}>Delete</button>
    )

    const likeBlog = () => {
      let newBlog = this.state.blog;
      newBlog.likes = newBlog.likes + 1;
      this.setState({ blog: newBlog });
      this.saveBlog();
    }

    if (!this.state.deleted) {
      return (
        <div className="content">
            <p className="clickableTitle" onClick={this.toggleShowInfo}>{this.props.blog.title} {this.props.blog.author}</p>
          {this.state.showInfo && blogInfo()}
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default Blog