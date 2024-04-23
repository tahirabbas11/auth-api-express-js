const apiErr = (err, req, res, next) => {
  // Checking if the error is a BadRequest error
  if (err.status === 400) {
    // Responding with the specific error message for BadRequest errors
    res.status(400).json({ error: { status: err.status || 400, message: err.message } });
  } else {
    // For other types of errors, respond with a generic error message
    res.status(err.status || 402).json({
      error: {
        status: err.status || 402,
        message: err.message || 'Internal Server Error',
      },
    });
  }
};

const expressError = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    },
  });
};

module.exports = {
  apiErr,
  expressError,
};
