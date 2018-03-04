import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const onCLick = () => {
        console.log('onCLick')
    }

    const blog = {
      author: 'author',
      title: 'title',
      url: 'url.com',
      likes: 7
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onCLick} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.likes)
  })

  it('clicking the button twice calls event handler twice', () => {
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
  
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onCLick} />)
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(clicks).toBe(2)
  })
})