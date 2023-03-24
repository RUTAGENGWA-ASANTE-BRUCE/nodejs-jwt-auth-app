const express = require('express');
const cors = require('cors');
const { loginRoute, jsonPatchRoute } = require('./routes');
const { config } = require('./config/env');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'Nodejs Microservice Task',
  });
});

app.use('/api', loginRoute);
app.use('/api', jsonPatchRoute);

app.listen(config.port, () => {
  console.log(
    'Server listening on port ' +
      config.port +
      '... in ' +
      config.node_env +
      ' mode'
  );
});

module.exports = app;
