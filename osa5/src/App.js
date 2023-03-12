import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import Togglable  from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes -a.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload();
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setSuccessMessage('Blog added!')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    window.location.reload()

  }

  const updateBlog = async(blogObject) => {
    console.log(blogObject.id)
    const updatedBlogObject = {
      likes: blogObject.likes + 1,
    }
    const updatedBlog = await blogService.update(blogObject.id, updatedBlogObject)
    setBlogs(blogs.map(x => x.id === blogObject.id ? updatedBlog : x));
    setSuccessMessage('Blog updated!')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }


 

const loginForm = () => {
  return (
    <div>
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    </div>
  )
}


  if (user === null) {
    return (
      <div>
        <Error message={errorMessage}/>
        {loginForm()}
      </div>
    )
  }


  return (
    <div>
      <Notification message={successMessage}/>
      <h2>{user.name} logged in</h2> 
      <button onClick={handleLogout}>logout</button>
      <h2>Blogs:</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
      )}
      <script src='Blog.js' async></script>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <NewBlogForm createBlog={addBlog}/>
      </Togglable>
      
      
    </div>
  )
  

}

export default App