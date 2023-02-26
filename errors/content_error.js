import CustomError from './custom_error.js'

class ContentError extends CustomError {
  constructor({ message, status = 403 }) {
    super(message)

    this.name = 'ContentError'
    this.status = status
  }
}

export default ContentError
