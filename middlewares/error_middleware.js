import AuthError from '../errors/auth_error.js'
import ValidationError from '../errors/validation_error.js'

function errorMiddleware(err, req, res, next) {
  if (err instanceof AuthError || err instanceof ValidationError) return res.status(err.status).json(err.toJson())

  res.status(500).json({
    status: 500,
    name: 'UnknownError',
    message: 'Unknown Error'
  })
}

export default errorMiddleware
