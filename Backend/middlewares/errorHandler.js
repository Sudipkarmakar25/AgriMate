// errorHandler.js

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const response = {
    message: err.message || 'Internal Server Error'
  };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }
  res.status(statusCode).json(response);
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
