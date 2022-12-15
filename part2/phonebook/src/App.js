import { useState ,useEffect} from 'react'
import axios from 'axios'
import personService from './services/persons'

const Notification = ({ notf,error }) => {
  if (notf&&error === null) {
    return null
  }
else if(notf!==null){
console.log("heyyyy");
  return (
    <div className='added'>
      {notf}
    </div>
  )
}
else if(error!==null){

  return (
    <div className='error'>
      {error}
    </div>
  )
}
}
const Filter=(props)=>{
  return(
    <form>
    <div>
      filter shown with <input value={props.searchItem} onChange={(event)=>props.setNewSearch(event.target.value)}/>
    </div>
    <button onClick={(e)=>{
      e.preventDefault();
    props.setSearchedArray( props.persons.filter((person)=>person.name.toUpperCase().includes(props.searchItem.toUpperCase())))
    }} type='submit'>search</button>
  </form>
  )
}
const PersonForm=({newName,newNumber,persons,setNewNumber,setNewName,setPersons,setSearchedArray,setNotificationMessage,setError})=>{
return(
   <form>
        <div>
          name: <input value={newName} onChange={(event)=>{
            console.log(event.target.value);
            setNewName(event.target.value)
          }}/>
        </div>
        <div>number: <input value={newNumber} onChange={(event)=>setNewNumber(event.target.value)} /></div>
        <div>
          <button onClick={(e)=>{
            e.preventDefault()
            const duplicates=persons.filter((person)=>person.name.toUpperCase()===newName.toUpperCase())
            if( duplicates.length>0){
             
              if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
                const firstperson=duplicates[0];
                const person={...firstperson,number:newNumber}
           personService.update(firstperson.id, person).then((response)=>{
            console.log(response);
              setPersons(persons.map((n)=>n.id!==firstperson.id?n:response));
              setSearchedArray(persons.map((n)=>n.id!==firstperson.id?n:response))
            }).catch((error)=>{setError(`Information of ${person.name} is removed from server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
              }
            }
           else{
            const person={name:newName,number:newNumber}
           personService.create(person).then((response)=>{
            setNotificationMessage(
              `Added ${response.name}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
              // setPersons(persons.concat(response));
              // setSearchedArray(persons.concat(response))
            }).catch(error=>{
             
              setError(error.response.data.error)
              setTimeout(() => {
                setError(null)
              }, 5000)
            })
          
           }
            
            setNewName('')
            setNewNumber('')
          }} type="submit">add</button>
        </div>
      </form>
)
}
const Persons=({searchePersons,set})=>{
  const general=(id)=>{
    const validate=()=>{
      if(window.confirm('are you sure?')){
       return personService.remove(id).then(()=>{
     set(searchePersons.filter((p)=>p.id!==id))
       })
      }
      else{
        return console.log('hey');
      }
    }
    return validate
  }
  return(
    <div>{searchePersons.map((person)=><div key={person.id}>{person.name} {person.number} <button onClick={general(person.id)}>delete</button></div>)} </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const[newNumber,setNewNumber]=useState('')
  const[searchItem,setNewSearch]=useState('')
  const[searchePersons,setSearchedArray]=useState([]);
  const [notfMessage, setNotificationMessage] = useState(null)
  const [errorm, setError] = useState(null)


  
useEffect(()=>{
  console.log('effects');
  personService.getAll().then((response)=>{
    console.log('promise fulfilled');
    setPersons(response)
    setSearchedArray(response)
  })
},[])
console.log('renders',persons.length);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notf={notfMessage} error={errorm}/>
      <Filter persons={persons} searchItem={searchItem} setSearchedArray={setSearchedArray} setNewSearch={setNewSearch}/>
      <h2>add new</h2>
     <PersonForm newName={newName} newNumber={newNumber} persons={persons} setError={setError}  setNotificationMessage={setNotificationMessage} setNewNumber={setNewNumber} setNewName={setNewName} setPersons={setPersons} setSearchedArray={setSearchedArray}/>
      <h2>Numbers</h2>
     <Persons searchePersons={searchePersons} set={setSearchedArray}/>
     
    </div>
  )
}

export default App