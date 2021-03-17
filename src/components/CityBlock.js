import City from './City.js'

const CityBlock = ({cities, onRefresh, onDelete}) => {
  return(
      <>
        {cities.map((city) => (
          <City key={city.CityID} city={city} onRefresh={onRefresh} onDelete={onDelete}/ >
        ))}
      </>
  )
}

export default CityBlock
