
 
/*
props.courses.map(( course) => { 
      <p><strong>{course.name}</strong></p>
      console.log(`Course name: ` , course.name)
      {
        course.parts.map(( part) => {
          <p>{part.name} {part.exercises}</p>
          console.log(`Part: `, part.name)     
        })
      }
        }
      )

*/

/*const Total = (props) => {
  const result = props.parts.map(part => part.exercises).reduce((partialSum, a) => partialSum + a,0)
  return(
    <p><strong>Total of {result} exercises</strong></p>
  )
  
}
//<Total parts = {props.courses.parts}/>


const Part = ({part}) => {
  console.log("part testi", part)
  course.parts.map(part => <p>{part.name} {part.exercises}</p>)
}



const Content = ({ course }) =>{ 
  console.log("toimiiks t-äää " , course)
  const nimet = course.map(name => name.name)
  console.log("NIIMET " ,nimet)
  return(
    <div>
      {course.map(name => <p><strong>{name.name}</strong></p>)}
    </div>
    
    
  )
}


*/

const Total = ({parts}) => {
  const result = parts.map(part => part.exercises).reduce((partialSum, a) => partialSum + a,0)
  return(
    <p><strong>Total of {result} exercises</strong></p>
  )
  
}

const Part = ({part}) => {
  console.log("this is part", part)
  return(
    <p>{part.name} {part.exercises}</p>
  )
}

const Course = ({course}) =>{
  console.log(course)
  return(
    <>
      <h3>{course.name}</h3>
      {course.parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      <Total parts = {course.parts}/>
      
    </>
    
  )
}

const App = () => {
  
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
            <Course key={course.id} course={course} />
          )}
    </div>
  )
}

export default App