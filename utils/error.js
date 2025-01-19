class RestError extends Error {
  #status;
  #code;
  #msg;

  constructor(status = 500, code = 'ERR_INTERNAL_SERVER', msg = 'Internal Server Error') {
    super(msg)
    this.#status = status;
    this.#code = code;
    this.#msg = msg;
  }

  get error() {
    return {
      status: this.#status,
      code: this.#code,
      msg: this.#msg
    }
  }
}

export default RestError;