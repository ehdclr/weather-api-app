export const successResponse = (message, data, statusCode = 200) => {
  return {
    status: 'success',
    statusCode: statusCode,
    message: message,
    data: data,
  };
};

