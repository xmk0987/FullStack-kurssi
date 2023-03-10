import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Error from './components/Error'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const addNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setSuccessMessage('A New BLOG!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }



  const loginForm = () => (
    <>
    <Error message={errorMessage}/>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
    </>
   
    )


    if (user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
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
          <Blog key={blog.id} blog={blog} />
        )}
        <form onSubmit={addNewBlog}>
          <p>title: <input value = {newTitle} onChange = {handleTitleChange}/></p>
          <p>author: <input value = {newAuthor} onChange = {handleAuthorChange}/></p>
          <p>url: <input value = {newUrl} onChange = {handleUrlChange}/></p>
          <p><button type="submit">create</button></p>
        </form>
        
      </div>
    )
    

}

export default App