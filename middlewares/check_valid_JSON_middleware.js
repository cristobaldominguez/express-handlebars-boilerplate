import ContentError from "../errors/content_error.js"

function checkValidJSON(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err)
    throw new ContentError({ message: err.message })
  }

  next()
}

export default checkValidJSON
