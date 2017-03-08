// require Pub model
const Pub = require('../models/pub');

function indexRoute(req, res){
  Pub
    .find(req.query)
    .exec()
    .then((pubs) => res.render('statics/index', { pubs }));// pass pubs into view
  // get pubs with Pub.find
}

module.exports = {
  index: indexRoute
};
