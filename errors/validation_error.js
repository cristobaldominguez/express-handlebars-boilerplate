import CustomError from './custom_error.js'

class ValidationError extends CustomError {
  constructor({ message, field }) {
    super(message)

    this.name = 'ValidationError'
    this.status = 403
    this.field = field
  }

  toJson() {
    const obj = super.toJson()
    obj['error']['field'] = this.field

    console.error(obj)
    return obj
  }
}

export default ValidationError
