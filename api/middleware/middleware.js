const User = require('./../users/users-model');
const Post = require ('./../posts/posts-model');

function logger(req, res, next) {
  console.log(`${new Date()} [${req.method}] ${req.url}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if(!user) {
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      req.user = user
      console.log(user)
      next()
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const {name} = req.body
    if (!name) {
      res.status(400).json({
        message: 'missing required name field'
      })
    } else {
      req.name = name 
      next()
    }
}

function validatePost(req, res, next) {
  const { text } = req.body
    if(!text) {
      res.status(400).json({
        message: 'missing required text field '
      })
    } else {
      req.text = text
      next()
    }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};
