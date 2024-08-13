const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const host = '0.0.0.0';




app.get('/', function (req, res) {
  res.send('Hello i am glad to see you here')
});

// import router files

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);



app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});































































// app.post('/person', function (req, res) {
//   res.send('Hello i received your data')
// })

// app.get('/maggie', function (req, res) {
//   res.send('welcome to our fast food center')
// })

// app.get('/dosa', function (req, res) {

//   var dosa = {
//     name : "dosa",
//     size : "medium",
//     price : 100,
//     isSambhar : true,
//   }
//   res.send(dosa)
// })
