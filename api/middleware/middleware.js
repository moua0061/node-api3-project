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
        message: 'the user id does not exist'
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
  console.log('no such user')
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  next()
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};
