const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const statics = require('../controllers/statics');
const secureRoute = require('../lib/secureRoute');
const pubs = require('../controllers/pubs');
const oauth = require('../controllers/oauth');
const upload = require('../lib/upload');
const users = require('../controllers/users');

router.route('/')
  .get(statics.index);

router.route('/profile')
  .get(secureRoute, users.show);

router.route('/profile')
  .delete(secureRoute, registrations.delete);

router.route('/users')
  .get(secureRoute, users.index);

router.route('/user/images/new')
  .get(secureRoute, users.newImage);

router.route('/user/images')
  .post(secureRoute, upload.single('filename'), users.createImage);

router.route('/users/:id/images/:imageId')
  .delete(secureRoute, users.deleteImage);

// router.route('/users/:id/images/:id/edit')
//   .get(secureRoute, users.edit);

router.route('/pubs')
  .get(pubs.index)
  .post(secureRoute, pubs.create);

router.route('/pubs/new')
  .get(secureRoute, pubs.new);

router.route('/pubs/:id')
  .get(pubs.show)
  .put(secureRoute, pubs.update)
  .delete(secureRoute, pubs.delete);

router.route('/pubs/:id/edit')
  .get(secureRoute, pubs.edit);

router.route('/pubs/:id/comments')
  .post(secureRoute, pubs.createComment);

router.route('/pubs/:id/comments/:commentId')
  .delete(secureRoute, pubs.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(upload.single('image'), registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/github')
  .get(oauth.github);

router.all('*', (req, res) => res.notFound());

module.exports = router;
