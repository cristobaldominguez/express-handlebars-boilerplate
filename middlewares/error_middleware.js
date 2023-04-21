import i18next from 'i18next'

function errorMiddleware(err, req, res, next) {
  if (err.is_an_error) return res.status(err.status).json(err.toJson())

  res.status(500).json({
    error: {
      status: 500,
      name: 'UnknownError',
      message: i18next.t('errors.unknown')
    }
  })
}

export default errorMiddleware
