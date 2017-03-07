const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const databaseURI = 'mongodb://localhost/project-2-development';
mongoose.connect(databaseURI);

const User = require('../models/user');
const Pub = require('../models/pub');


User.collection.drop();
Pub.collection.drop();

Pub.create([{
  name: 'The Black Horse',
  address: '40 Leman St, Poplar, London E1 8EU',
  expensiveness: 2,
  atmosphere: 2
}, {
  name: 'Big Chill Bar',
  address: 'Dray Walk, Brick Ln, London E1 6QL',
  expensiveness: 2,
  atmosphere: 3
}, {
  name: 'Leman Street Tavern',
  address: '31 Leman Street, Whitechapel, London E1 8PT',
  expensiveness: 3,
  atmosphere: 3
}, {
  name: 'The Blind Beggar',
  address: '337 Whitechapel Rd, London E1 1BU',
  expensiveness: 2,
  atmosphere: 2
}])
  .then((pubs) => {
    console.log(`${pubs.length} pubs created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
