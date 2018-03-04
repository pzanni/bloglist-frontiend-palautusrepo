import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  it('renders content correctly', () => {
    const onCLick = () => {
        console.log('onCLick')
    }

    const blog = {
      author: 'author',
      title: 'title',
      url: 'url.com',
      likes: 7
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).not.toContain(blog.likes)
    expect(contentDiv.text()).not.toContain(blog.url)
  })

  it('clicking title reveals info', () => {
    let clicks = 0;
    const onCLick = () => {
        clicks = clicks + 1;
    }
    const blog = {
      author: 'author',
      title: 'title',
      url: 'url.com',
      likes: 7
    }
  
    const mockHandler = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} />)
  
    const clickableTitle = blogComponent.find('.clickableTitle')
    clickableTitle.simulate('click')

    const contentDiv = blogComponent.find('.blogInfo')
    expect(contentDiv.text()).toContain(blog.likes)
    expect(contentDiv.text()).toContain(blog.url)
  })
})
