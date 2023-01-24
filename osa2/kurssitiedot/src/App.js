const Header = (props) => {
  return(
    <h1>{props.course}</h1>
    
  )
}

const Content = (props) => {
  return(
    props.parts.map(part => <p key={part.name}>{part.name} {part.exercises}</p>)
  )
}
 
const Total = (props) => {
  const result = props.parts.map(part => part.exercises).reduce((partialSum, a) => partialSum + a,0)
  return(
    <p><strong>Total of {result} exercises</strong></p>
  )
  
}


const Course = (props) =>{
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts = {props.course.parts}/>
      <Total parts = {props.course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }
  

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App