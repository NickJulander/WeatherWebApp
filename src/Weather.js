import { useState, useEffect } from 'react'
import Header from './components/Header.js';
import AddCity from './components/AddCity.js';
import CityBlock from './components/CityBlock.js'

function App() {
  const [cities, setCities] = useState ([])
  useEffect(() => {
    const getCities = async () => {
      const citiesFromServer = await fetchCities()
      setCities(citiesFromServer.data)
    }
    getCities()
  }, [])

const fetchCities = async () => {
  const res = await fetch('http://localhost:4000/cities')
  const data = await res.json()
  return data
}

const addCity = async (city) => {
  const name = city['addText']
  const res = await fetch('http://localhost:4000/addcity', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({city: name})
  });
  window.location.reload();
}

const refreshCity = async (cityId, cityName) => {
  const res = await fetch('http://localhost:4000/refresh', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({id: cityId, name: cityName})
  });
  window.location.reload();
}

const deleteCity = async (cityId) => {
  console.log(cityId);
  const res = await fetch('http://localhost:4000/delete', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({id: cityId})
  });
  window.location.reload();
}

  return (
    <div className="container">
      <Header/>
      <AddCity onAdd={addCity}/>
      <CityBlock cities={cities} onRefresh={refreshCity} onDelete={deleteCity}/>
    </div>
  );
}

export default App;
