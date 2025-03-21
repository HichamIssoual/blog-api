class ErrorGenrator extends Error {
    constructor() {
        super();
    }
    generate(statusCode, statusText, message, data = null) {
        this.statusCode = statusCode;
        this.data = data;
        this.statusText = statusText;
        this.message = message;
        return this;
    }
}
module.exports = ErrorGenrator;