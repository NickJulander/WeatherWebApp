const City = ({city, onRefresh, onDelete}) => {

  const refreshClicked = async () => {
    onRefresh(city.CityID, city.SearchName);
  }

  const deleteClicked = async () => {
    onDelete(city.CityID);
  }

  return(
    <div className='city_container'>
      {city.CityName}
      <div className='weather_info'>
        {city.Weather}<br/>
        {city.Temp}
      </div>

      <button className='close_btn' onClick={deleteClicked}></button>

      <button className ='reload' onClick={refreshClicked}>&#x21bb;</button>

    </div>
  )
}

export default City
