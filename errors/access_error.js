import CustomError from './custom_error.js'

class AccessError extends CustomError {
  constructor({ message, status = 403 }) {
    super(message)

    this.name = 'AccessError'
    this.status = status
  }
}

export default AccessError
