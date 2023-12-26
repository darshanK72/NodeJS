import { CustomError } from "./CustomError.js";

export class NotFoundError extends CustomError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}