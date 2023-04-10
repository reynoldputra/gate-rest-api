const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello');
});

var gateApi = require('./api/gate-api');
app.use('/', gateApi);

app.listen(port);
