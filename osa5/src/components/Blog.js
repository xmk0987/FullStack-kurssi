import { useState } from 'react';


const Blog = ({blog, updateBlog}) => {
  const [visible, setVisible] = useState(false);
 // const blogRef = useRef()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    
  }
  

   const handleLike = async () => {
      await updateBlog(blog)
   }

  const toggleVisibility = () => setVisible(!visible);
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible &&
      <div>
        {blog.url}<br/>
        {blog.likes} &nbsp;<button onClick={handleLike}>like</button><br/>
        {blog.user.name}
      </div>
      }
      
    </div> 
  )
}

export default Blog