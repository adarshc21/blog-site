const ErrorHanlder = require('../utils/errorHandler');

module.exports = error = async(err, req, res, next) => {

  if(err.code === 11000){
    err.message = 'username is not available'
  }

  if (err.name === "ValidationError") {
    err.message = Object.values(err.errors).map(
      (error) => `${error.path}: ${error.message}`
    );
  }

  if (err.name === "CastError") {
    err.message = `invalid ${err.path}`
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'internal server error'
  })
}