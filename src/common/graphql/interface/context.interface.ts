import { Request, Response } from 'express';

export interface IGraphqlContext {
  me: IMe;
  req: Request;
  res: Response;
}

export interface IMe {
  userId: string;
  token: string;
  roles: string[];
  reCaptchaToken?: string;
}
