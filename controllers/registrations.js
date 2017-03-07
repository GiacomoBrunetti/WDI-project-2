const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res, next) {
  if(req.file) req.body.profileImage = req.file.key;
  User
    .create(req.body)
    .then((user) => {
      req.flash('success', `Thanks for registering, ${user.username}!`);
      res.redirect('/login');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        req.flash('alert', 'Passwords do not match');
        return res.redirect('/register');
      }
      next(err);
    });
}

function deleteRoute(req, res, next) {
  req.user
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('/', 'Your account has been deleted'));
    })
    .catch(next);
}

function showRoute(req, res) {
  return res.render('registrations/show');
}

function usersRoute(req, res) {
  return res.render('registrations/users');
}

function editRoute(req, res) {
  return res.render('registrations/edit');
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute,
  show: showRoute,
  users: usersRoute,
  edit: editRoute
};
