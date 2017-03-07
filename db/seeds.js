const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Pub = require('../models/pub');
const User = require('../models/user');

Pub.collection.drop();
User.collection.drop();

User
  .create([{
    firstname: 'Raiden',
    lastname: 'Dilan',
    username: 'raidendilan',
    email: 'raiden18@me.com',
    password: 'Design',
    passwordConfirmation: 'Design'
  }])
  .then((users) => {
    console.log(`${users.length} Users created`);
    return Pub
      .create([{
        name: 'La Plagne',
        website: 'www.la-plagne.com',
        country: 'France',
        lifts: '95',
        stars: 4,
        createdBy: users[0],
        comment: [ 'say' ],
        image: 'http://cdn.welove2ski.com/wp-content/uploads/la_plagne_ski_school_oxygene.jpg'
      }, {
        name: 'Grandvalira',
        website: 'www.grandvalira.com',
        country: 'Andorra',
        lifts: '90',
        stars: 3,
        createdBy: users[0],
        comment: [ 'boo' ],
        image: 'https://www.pgl.co.uk/Files/Files/Schools/Skiing%20and%20Snowboarding/Pub%20Gallery/Andorra/Grandvalira/SS-M-Ski-Andorra-Pub-Grandvalira.jpg'

      }, {
        name: 'St Moritz',
        website: 'www.stmoritz.ch',
        country: 'Switzerland',
        lifts: '105',
        stars: 5,
        createdBy: users[0],
        comment: [ 'hello' ],
        image: 'https://www.skisafari.com/sites/ss/files/st-moritz-ski-pub.jpg'
      }, {
        name: 'Fernie Alpine',
        website: 'www.skifernie.com',
        country: 'Canada',
        lifts: '85',
        stars: 4,
        createdBy: users[0],
        comment: [ 'something' ],
        image: 'http://img5.onthesnow.com/image/gg/93/93694.jpg'
      }]);
  })
  .then((pubs) => console.log(`${pubs.length} pubs created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
