const { connect, connection } = require('mongoose');

connect('mongodb://localhost/mernapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
