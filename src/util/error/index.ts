export interface IError {
    message?: string,
    status?: number,
    details?: Array<unknown | Error>
}
export class GeneralError extends Error {
    message: string;
    status: number;
    details: Array<unknown | {}>;
    constructor({ message, status, details }: IError) {
        super();
        this.status = this.setStatus(status);
        this.message = this.setMessage(message);
        this.details = this.setDetails(details);
    }
    protected setStatus(status?: number): number {
        if (status) return status;
        if (this instanceof InternalError) return 500;
        if (this instanceof BadRequest) return 400;
        if (this instanceof NotFound) return 404;
        return 400
    }
    protected setMessage(message?: string): string {
        if (message) return message;
        if (this instanceof InternalError) return 'There was an internal Error';
        if (this instanceof BadRequest) return 'Bad Request';
        if (this instanceof NotFound) return 'Not Found';
        return "there was an internal error"
    }
    protected setDetails(details?: Array<unknown | Error>):Array<unknown | Error> {
        if (details) return details;
        return []
    }
    public getResponseObject() {
        return {
            message: this.message,
            status: this.status,
            details: this.details
        }
    }
}

export class BadRequest extends GeneralError { }
export class InternalError extends GeneralError { }
export class NotFound extends GeneralError { }

