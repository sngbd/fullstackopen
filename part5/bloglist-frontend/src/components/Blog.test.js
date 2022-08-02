import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  const blog = {
    title: 'React',
    author: 'Meta',
    url: 'reactjs.org',
    likes: 50932,
    user: {
      name: 'sngbd'
    }
  }

  const user = {
    name: 'sngbd'
  }

  let component
  beforeEach(() => {
    component = render(
      <div>
        {blog.title} {blog.author}
        <Togglable buttonLabel='view' toggleLabel='hide'>
          {blog.url}
          <br />
          likes {blog.likes} <button>like</button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.name === user.name &&
          <button>remove</button>}
        </Togglable>
      </div>
    )
  })

  test('renders the blog\'s title and author but not url and likes', () => {
    const element = screen.getByText('React Meta')
    expect(element).toBeDefined()

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('blog\'s url and likes are shown when the view button has been clicked', async () => {
    const usr = userEvent.setup()
    const button = screen.getAllByText('view')
    await usr.click(button[0])

    expect(component.container).toHaveTextContent('reactjs.org')
    expect(component.container).toHaveTextContent('likes 50932')
  })
})