
import * as express from 'express'

export abstract class BaseController {

  protected abstract executeImpl (req: express.Request, res: express.Response): Promise<void | any>;

  public async execute (req: express.Request, res: express.Response): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      this.fail(res, 'An unexpected error occurred')
    }
  }

  public static jsonResponse (res: express.Response, code: number, message: string, status:number) {
    // @ts-ignore
    return res.status(code).json({  status, message });
  }

  public ok<T> (res: express.Response, dto?: T) {

    if (!!dto) {
      // @ts-ignore
      res.type('application/json');
      // @ts-ignore
      if(dto.token){
        // @ts-ignore
        res.setHeader('Identifier', dto.token);
        // @ts-ignore
        delete dto.token;
      }
      // @ts-ignore
      return res.status(200).json({
        ...dto,
        'status': 1
      });
    } else {
      // @ts-ignore
      return res.sendStatus(200);
    }
  }

  public created (res: express.Response) {
    // @ts-ignore
    return res.sendStatus(201);
  }

  public clientError (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized', 0);
  }

  public unauthorized (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized', -2);
  }

  public paymentRequired (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message ? message : 'Payment required', -3);
  }

  public forbidden (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden', 5);
  }

  public notFound (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found', 4);
  }

  public conflict (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict',2);
  }

  public tooMany (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests',3);
  }

  public todo (res: express.Response) {
    return BaseController.jsonResponse(res, 400, 'TODO', 6);
  }

  public fail (res: express.Response, error: Error | string) {
    console.log(error);
    // @ts-ignore
    return res.status(500).json({
      status: -1,
      message: error.toString()
    })
  }
}