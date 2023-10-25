export class HttpError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor(message = 'Resource Not Found.') {
      super(404, message);
    }
  }
  
  export class BadRequestError extends HttpError {
    constructor(message = 'Bad request') {
      super(400, message);
    }
  }

  export class ConfilictError extends HttpError {
    constructor(message = 'Conflict request') {
      super(409, message);
    }
  }
  