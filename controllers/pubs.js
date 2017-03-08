const Pub = require('../models/pub');

function indexRoute(req, res, next) {
  Pub
    .find()
    .populate('createdBy')
    .exec()
    .then((pubs) => res.render('pubs/index', { pubs }))
    .catch(next);
}

function newRoute(req, res) {
  if(req.file) req.body.filename = req.file.key;
  return res.render('pubs/new');
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;
  req.body = Object.assign({}, req.body);
  console.log(req.body);


  Pub
    .create(req.body)
    .then(() => res.redirect('/pubs'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/pubs/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Pub
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then((pub) => {
      if(!pub) return res.notFound();
      return res.render('pubs/show', { pub });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Pub
    .findById(req.params.id)
    .exec()
    .then((pub) => {
      return res.render('pubs/edit', { pub });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Pub
    .findById(req.params.id)
    .exec()
    .then((pub) => {
      if(!pub) return res.notFound();

      for(const field in req.body) {
        pub[field] = req.body[field];
      }

      return pub.save();
    })
    .then((pub) => res.redirect(`/pubs/${pub.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/pubs/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Pub
    .findById(req.params.id)
    .exec()
    .then((pub) => {
      if(!pub) return res.notFound();
      return pub.remove();
    })
    .then(() => res.redirect('/pubs'))
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Pub
  .findById(req.params.id)
  .exec()
  .then((pub) => {
    if(!pub) return res.notFound();

    pub.comments.push(req.body); // create an embedded record
    return pub.save();
  })
  .then((pub) => res.redirect(`/pubs/${pub.id}`))
  .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Pub
  .findById(req.params.id)
  .exec()
  .then((pub) => {
    if(!pub) return res.notFound();
    // get the embedded record by it's id
    const comment = pub.comments.id(req.params.commentId);
    comment.remove();
    // pub.comments.push(req.body);

    return pub.save();
  })
  .then((pub) => res.redirect(`/pubs/${pub.id}`))
  .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
