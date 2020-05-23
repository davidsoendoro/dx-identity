import 'reflect-metadata';
import { Response } from 'lambda-api';
import { injectable } from "inversify";

@injectable()
export abstract class BaseController {

    protected readonly DEFAULT_STATUS_CODE = 200;
    protected readonly DEFAULT_STATUS_MESSAGE = 'OK';
    protected readonly DEFAULT_ERROR_STATUS_CODE = 500;
    protected readonly DEFAULT_ERROR_STATUS_MESSAGE = 'Server Internal Error';
    protected readonly DEFAULT_ERROR_REASON = 'UNSPECIFIED ERROR';
  
    constructor() {
    }
  
    protected respondError(response: Response, statusCode: number = this.DEFAULT_ERROR_STATUS_CODE, 
      message: string = this.DEFAULT_ERROR_STATUS_MESSAGE,
      reason: string = this.DEFAULT_ERROR_REASON) {
      console.log("respondError -", message, reason);
      response.header('Access-Control-Allow-Origin', '*').status(statusCode).send({
        statusCode: statusCode,
        statusMessage: message,
        reason: reason
      });
    }
  
    protected respondSuccess(response: Response, statusCode: number = this.DEFAULT_STATUS_CODE, 
      message: string = this.DEFAULT_STATUS_MESSAGE, responseBuilder: (body: any) => any) {
  
      let body = {
        statusCode: statusCode,
        statusMessage: message,
      };
      body = responseBuilder(body);
  
      response.header('Access-Control-Allow-Origin', '*').status(statusCode).send(body);
    }
  
    protected respondSuccessSendFileCsv(response: Response, statusCode: number = this.DEFAULT_STATUS_CODE, 
      message: string = this.DEFAULT_STATUS_MESSAGE, responseBuilder: (body: any) => any) {
  
        let body = {
          statusCode: statusCode,
          statusMessage: message,
        };
        body = responseBuilder(body);
    
        response.header('Content-Type', 'text/csv').header('Access-Control-Allow-Origin', '*').status(statusCode).send(body);
    }
  
    protected responseSuccessCsv(response: Response, statusCode: number = this.DEFAULT_STATUS_CODE, body: String, fileName: String) {
      response
        .header('Access-Control-Allow-Origin', '*')
        .header('Content-Type', 'text/csv')
        .header('Content-Disposition', `attachment; filename="${fileName}.csv"`)
        .status(statusCode).send(body);
    }
  
}