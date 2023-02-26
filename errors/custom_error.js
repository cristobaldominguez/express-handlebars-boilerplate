class CustomError extends Error {
  constructor(message) {
    super(message)

    this.name = ''
    this.status = 0
    this.is_an_error = true
  }

  toJson() {
    return {
      error: {
        name: this.name,
        status: this.status,
        message: this.message
      }
    }
  }
}

export default CustomError
