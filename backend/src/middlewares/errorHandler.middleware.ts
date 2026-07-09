import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";
import { z, ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";

const formatZodErrorResponse = (res: Response, err: z.ZodError) => {
  const errors = err?.issues?.map((error) => ({
    field : error.path.join("."),
    message : error.message
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation error",
    errors : errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  })

}

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  console.error(`Error Occured on PATH: ${req.path}`, err);

  if (err instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format. Please check your request body.",
    });
  }

  if(err instanceof ZodError) {
    return formatZodErrorResponse(res, err);
  }

  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    })
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
    error: "Unknown error occurred",
  });
};
