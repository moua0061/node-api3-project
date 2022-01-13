const express = require('express');
const User = require('./users-model');
const Post = require('./../posts/posts-model');
const { 
  logger, 
  validateUserId, 
  validateUser, 
  validatePost 
} = require('./../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', logger, (req, res, next) => {
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  User.insert({ name: req.name})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, { name: req.name })
    .then(updatedUser => {
      res.status(201).json(updatedUser)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user)
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  User.getUserPosts(req.params.id)
    .then(userPost => {
      res.json(userPost)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  Post.insert({ user_id: req.params.id, text: req.text })
    .then(newPost => {
      res.status(201).json(newPost)
    })
    .catch(next)
});

router.use((err, req, res, next) => {
  console.log('Yo! something went wrong really bad!')
  res.status(err.status || 500).json({
    message: 'This is the super sad path =( something went wrong with your router',
    error: err.message
  })
})

// do not forget to export the router
module.exports = router;
