import Logger from './logger';
import Express from 'express';



const errorHandler = (error: Error) => {
    Logger.error(error.message);
};


const unknownEndPoint = (_request:Express.Request, response: Express.Response) => {
    response.send({
        "status": 404,
        "message": "Unknown End Point",
        "addtionalInfo": {}
    });
};

export default {
    errorHandler,
    unknownEndPoint
};