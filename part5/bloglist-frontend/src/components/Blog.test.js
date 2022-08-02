import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

describe('<Togglable />', () => {
  const mockHandler = jest.fn()

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
          likes {blog.likes} <button onClick={mockHandler}>like</button>
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

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const usr = userEvent.setup()
    const button = screen.getAllByText('view')
    await usr.click(button[0])

    const likeButton = screen.getAllByText('like')
    await usr.click(likeButton[0])
    await usr.click(likeButton[0])

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('<BlogForm />', () => {
  test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = jest.fn()
    const usr = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const input = screen.getAllByRole('textbox')
    await usr.type(input[0], 'SICP')
    await usr.type(input[1], 'Hal Abelson')
    await usr.type(input[2], 'sicp.com')

    const sendButton = screen.getByText('create')
    await usr.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('SICP')
  })
})