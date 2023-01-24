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

    
  export default Course