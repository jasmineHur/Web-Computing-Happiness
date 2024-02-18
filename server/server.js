const api = require('./routes/index');
const express = require('express');
const app = express();

app.use('/api', api);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3001, () => console.log('Example app listening on port 3001!'));
