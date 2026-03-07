import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundHandlerMiddleware: RequestHandler = (
  req,
  res,
) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: '404-not found' });
};

export default notFoundHandlerMiddleware;
