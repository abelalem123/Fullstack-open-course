import { useState, useEffect } from "react";
import axios from 'axios'
const Detail = ({ result }) => {
  const [weathers, setWeather] = useState([
    {
    "id": 337996,
    "name": "Federal Democratic Republic of Ethiopia",
    "coord": {
      "lat": 8,
      "lon": 38
    },
    "main": {
      "temp": 60.15,
      "feels_like": 58.64,
      "temp_min": 60.15,
      "temp_max": 60.15,
      "pressure": 1014,
      "humidity": 59,
      "sea_level": 1014,
      "grnd_level": 745
    },
    "dt": 1669291749,
    "wind": {
      "speed": 4.25,
      "deg": 165
    },
    "sys": {
      "country": "ET"
    },
    "rain": null,
    "snow": null,
    "clouds": {
      "all": 89
    },
    "weather": [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
      }
    ]
  }])
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/find?q=${result.name.common}&units=imperial&type=accurate&mode=json&APPID=1e336a75b1318ec3de60e86f5de829b3`).then((response) => {
      setWeather(response.data.list)
    })
  
  }, [])
  return (
    <div>
      <h1>{result.name.common}</h1>
      <div> capital {result.capital}</div>
      <div> area {result.area}</div>
      <div> languages {Object.values(result.languages).map((lang) => <li key={lang}>{lang}</li>)}</div>
      <div><img src={result.flags.png} /></div>
      <div><h2>weather in {result.capital}</h2></div>
      <div>temperature {weathers[0].main.temp} celsius</div>
      <div><img src={`https://openweathermap.org/img/wn/${weathers[0].weather[0].icon}@2x.png`}/></div>
      <div>wind {weathers[0].wind.speed} celsius</div>
    </div>
  )
}
const App = () => {
  const [query, setQuery] = useState('ethio')
  const [results, setResult] = useState([])
  const [showValue,setShow]=useState([])
  console.log(query)
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${query}`).then((response) => {
      setResult(response.data)
    })
    setShow([])
  }, [query])
if(showValue.length===0){
  return (
    <div className="App">
      <form >
        find countries  <input value={query} onChange={(event) => {
          setQuery(event.target.value)
        }} />

      </form>
      <div>
        {
          results.length > 10 ? <div>too many matches, specify another filter</div> : results.length == 1 ?
            <Detail result={results[0]} />
            :
            results.map((result) => <div key={result.name.common}>{result.name.common} <button onClick={()=>setShow(showValue.concat(result))} >show</button></div>
            )
        }
      </div>
    </div>
  );
}
else {
  return(
    <div>
       <form >
        find countries  <input value={query} onChange={(event) => {
          setQuery(event.target.value)
        }} />

      </form>
      <div><Detail result={showValue[0]}/></div>
    </div>
  )
}
}

export default App;
