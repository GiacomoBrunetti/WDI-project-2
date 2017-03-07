const User = require('../models/user');

function showRoute(req, res) {
  res.render('users/show');
}

function newImageRoute(req, res) {
  res.render('users/newImage');
}

function createImageRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;

  // For some reason multer's req.body doesn't behave like body-parser's
  req.body = Object.assign({}, req.body);

  req.user.images.push(req.body);

  req.user
    .save()
    .then(() => res.redirect('/profile'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
      next(err);
    });
}

function deleteImageRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      const image = user.images.id(req.params.imageId);
      image.remove();
      return user.save();
    })
    // .then(() => res.redirect(`/users/${req.params.id}`))
    .then(() => res.redirect('/profile'))
    .catch(next);
}

function indexRoute(req, res) {
  res.render('users/index');
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  newImage: newImageRoute,
  createImage: createImageRoute,
  deleteImage: deleteImageRoute
};
