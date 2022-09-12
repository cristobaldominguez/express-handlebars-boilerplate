function acceptsFormatMiddleware(req, res, next) {
  // for several options req.accepts(['json', 'text'])
  req.expects_html = req.accepts('text/html')

  next()
}

export default acceptsFormatMiddleware
