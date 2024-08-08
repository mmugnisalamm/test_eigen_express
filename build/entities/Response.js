"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.Response = Response;
