import { NextFunction, Request, Response } from "express";

export function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {

  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  response.status(status).json({
    success: false,
    error: {
      message,
      status,
    },
  });
}