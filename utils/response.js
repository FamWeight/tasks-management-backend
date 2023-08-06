// Function to send a successful response
export const successResp = (res, message = "Success.", data, status = 200) => {
  return res.status(200).json({
    status: status,
    message: message,
    data: data,
  });
};

// Function to send a response indicating successful resource creation
export const createdResp = (res, message, data, status = 201) => {
  return res.status(status).json({
    status: status,
    message: message,
    data: data,
  });
};

// Function to send an error response
export const errorResp = (
  res,
  message = "Internal server error.",
  status = 500
) => {
  return res.status(status).json({
    status: status,
    message: message,
  });
};

// Function to send a "Not Found" response
export const notFoundResp = (res, message = "Not Found.", status = 404) => {
  return res.status(status).json({
    status: status,
    message: message,
  });
};
