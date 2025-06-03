import { useSelector } from 'react-redux'
import Blog from './Blog'
import { createSelector } from '@reduxjs/toolkit'
import { Table } from 'react-bootstrap'

const selectBlogs = (state) => state.blogs
const selectUser = (state) => state.user

const selectBlogListUser = createSelector(
  [selectBlogs, selectUser],
  (blogs, user) => {
    return { blogs, user }
  }
)

const BlogList = () => {
  const { blogs, user } = useSelector((state) => selectBlogListUser(state))
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <Table bordered striped>
      <tbody>
        {sortedBlogs.map((blog) => (
          <tr key={blog.id}>
            <td>
              <Blog blog={blog} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default BlogList
