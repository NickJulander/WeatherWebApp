const express = require('express');
const app = express();
const cors = require('cors');
const dbservice = require('./dbservice');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/cities', (request, response) => {
  const db = dbservice.getDbServiceInstance();
  const result = db.getAllCities();
  result
  .then(data => response.json({data: data}))
  .catch(err => console.logg(err));
});

app.post('/addcity', (request, response) => {
  const db = dbservice.getDbServiceInstance();
  const result = db.addCity(request.body.city);
  result
  .then(data=>response.json({data:data}))
});

app.post('/refresh', (request, response) => {
  const db = dbservice.getDbServiceInstance();
  const result = db.refreshCity(request.body.id, request.body.name);
  result
  .then(data=>response.json({data:data}))
});

app.post('/delete', (request, response) => {
  const db = dbservice.getDbServiceInstance();
  const result = db.deleteCity(request.body.id);
  result
  .then(data=>response.json({data: data}))
});

app.listen(4000, () => console.log("app is running"));
