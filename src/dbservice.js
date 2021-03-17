const mysql = require('mysql');
var unirest = require("unirest");

var instance = null;

const connection = mysql.createConnection({
  host: "weatherdb.cmn7v329ii2s.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: 'password',
  database: "weatherdb",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.log("ERROR" + err.message);
  }
  console.log('db ' + connection.state)
});

class DbService{
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllCities() {
    try {
      const res = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM CityWeather;";
        connection.query(query, (err, result) => {
          if (err) reject (new Error(err.message));
          resolve(result);
        });
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async addCity(city) {
    var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");

    req.query({
      "q": city,
      "id": "2172797",
      "lang": "null",
      "units": "imperial",
    });
    req.headers({
      "x-rapidapi-key": "1344f122f5msh721cb43e64de2dcp180472jsne2d801657c53",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    });


    req.end(function (res) {
      if (res.error) return;
      const query =  "INSERT INTO CityWeather (CityName, Temp, Weather, SearchName) VALUES (?,?,?,?);";
      connection.query(query, [res.body.name, res.body.main.temp, res.body.weather[0].main, city]);
    });
  }

  async refreshCity(id, searchName) {
    var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");

    req.query({
      "q": searchName,
      "id": "2172797",
      "lang": "null",
      "units": "imperial",
    });
    req.headers({
      "x-rapidapi-key": "1344f122f5msh721cb43e64de2dcp180472jsne2d801657c53",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    });


    req.end(function (res) {
      if (res.error) return;
      const query =  "UPDATE CityWeather SET Temp = ?, Weather = ? WHERE CityID = ?;";
      connection.query(query, [res.body.main.temp, res.body.weather[0].main, id]);
    });
  }

  async deleteCity(id) {
    const query =  "DELETE FROM CityWeather WHERE CityID = ?;";
    connection.query(query, [id]);
  }
}

module.exports = DbService;
