import express from 'express';
import { last, isEmpty } from 'lodash';
import { verify } from 'jsonwebtoken';
import { Request } from '../type/context';
import { SECURE_STRING } from '../config/constants';

const isAuthenticated = async (
  req: Request,
  response: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = last(authHeader.split(' ')); // Bearer asdasdasd
  if (isEmpty(token)) {
    req.isAuth = false;
    return next();
  }

  let decodedToken: any;
  try {
    decodedToken = verify(token, SECURE_STRING);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  return next();
};

export { isAuthenticated };
