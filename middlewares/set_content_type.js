function setContentType(req, res, next) {
  if (!req.accepts('text/html')) {
    res.set({ 'content-type': 'application/json; charset=utf-8' })
  }

  next()
}

export default setContentType
