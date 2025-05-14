import Blog from './Blog'

const BlogList = ({ blogList, onBlogLike, user, onBlogDelete }) => {

  const handleOnBlogLike = async (blog) => {
    await onBlogLike(blog)
  }
  const handleOnBlogDelete = async (blog) => {
    await onBlogDelete(blog)
  }


  return (
    <div>
      {blogList.map(blog => (
        <Blog key={blog.id} blog={blog} onLike={handleOnBlogLike} user={user} onDelete={handleOnBlogDelete} />
      ))}
    </div>
  )
}

export default BlogList