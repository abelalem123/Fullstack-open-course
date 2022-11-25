const Total=({parts})=>{
    var totalsum=parts.reduce((sum,part)=>{
      return sum+part.exercises
    },0)
    return(
      <h4>total {totalsum} exercises</h4>
    )
    }
    
    const List=({name,exercises})=><div >{name} {exercises}</div  >
    
    const Part=({parts})=>{
    return(
      <div>
        {parts.map((part)=>{
        
          return <List key={part.id} name={part.name} exercises={part.exercises}/>
        })}
       <Total parts={parts}/>
      </div>
    )
    }
    
    const Course=({course})=>{
    return(
      <div>
        {
          course.map((c)=><div key={c.id}>
            <h2>{c.name}</h2>
          <Part parts={c.parts}/></div>)
        }
      
      </div>
    )
    }

    export default Course