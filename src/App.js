
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const API_URL ="https://api.openweathermap.org/data/2.5/weather?"
const ICON_URL ="https://api.openweathermap.org/img/wn/"
const API_KEY ='ff74358d895161250120669f22c6b066';
function App() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [temp, setTemp] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [direction, setDirection] = useState(0)
  const [description, setDescription] = useState(0)
  const [icon, setIcon] = useState(0)
  
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        console.log(position)
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
       

        const address =API_URL+
        'lat='+latitude+
        '&lon='+longitude+
        '&units=metric'+
        '&appid=' +API_KEY;
        axios.get(address)
        .then((response)=>{
          console.log(response.data)
          setTemp(response.data.main.temp)
          setSpeed(response.data.wind.speed)
          setDirection(response.data.wind.deg)
          setDescription(response.data.weather[0].description)
          setIcon(ICON_URL+response.data.weather[0].icon+'@2x.png')
          console.log(ICON_URL+response.data.weather[0].icon+'@2x.png')

        }).catch(error=>{
          alert(error)
        })
    },(error)=>{
      console.log(error)
      alert("paikkannus epäonnistui")

    })
    }else{
      alert("Selaimesi ei tue paikannusta")
    }
  }, [])
  if(isLoading){
  
    return <p>ladataan sijaintia</p>
    
  }
    else{

    
  
  return (
    <div className="App">
      <p>sijaintisi:{latitude},{longitude}</p>
    <p>{temp} C</p>
    <p>{speed*3.6} km/h {direction} degrees</p>
    <p>{description}</p>
    <img src={icon} alt=""/>
    </div>
  );
}
}

export default App;
