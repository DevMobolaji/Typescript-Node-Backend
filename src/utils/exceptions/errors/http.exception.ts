class HttpException extends Error {

    constructor(message: string) {
        super(message);
    }
}


export default HttpException;