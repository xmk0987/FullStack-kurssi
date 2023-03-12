import { useState } from 'react';

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false);
 // const blogRef = useRef()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    
  }
  if(blog.user.name === undefined){
    window.location.reload()
  }

  const toggleVisibility = () => setVisible(!visible);
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible &&
      <div>
        {blog.url}<br/>
        {blog.likes} &nbsp;<button type="button">like</button><br/>
        {blog.user.name}
      </div>
      }
      
    </div> 
  )
}

export default Blog