import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import  userEvent  from '@testing-library/user-event'
import Blog from './Blog'


test('renders title and author',() => {
  const blog={
    title:'Avatar',
    author:'abebe',
    url:'avatar.com',
    likes:21
  }

  render(<Blog blog={blog} />)
  const element=screen.getByText(21)
  expect(element).toBeDefined()
})

// test('url and number of likes shown',async() => {
//   const blog={
//     title:'Avatar',
//     author:'abebe',
//     url:'avatar.com',
//     likes:21
//   }
//   // const toggleRef=useRef()
//   const mockHandler=jest.fn()
//   render(<Blog blog={blog}>
//     <Toggleable  ref={mockHandler}/>
//   </Blog>)
//   const user=userEvent.setup()
//   const button=screen.getByText('view')
//   //console.log(button)
//   await user.click(button)
//   const element=screen.getByText(21)
//   expect(element).toBeDefined()

// })

test('like button clicked twice',async() => {
  const blog={
    title:'Avatar',
    author:'abebe',
    url:'avatar.com',
    likes:21
  }
  const mockHandler=jest.fn()
  render(<Blog blog={blog} />)
  const user=userEvent.setup()
  const button=screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})