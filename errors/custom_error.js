class CustomError extends Error {
  constructor(message) {
    super(message)

    this.name = ''
    this.status = 0
  }

  toJson() {
    return {
      name: this.name,
      status: this.status,
      message: this.message
    }
  }
}

export default CustomError
