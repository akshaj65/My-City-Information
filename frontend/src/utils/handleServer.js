const handleServerError = (error) => {
    const errorMessage = error.response && error.response.data.message
      ? error.response.data.message
      : 'Something went wrong. Please try again later.';
  
    if (error.response && error.response.status === 503) {
      return 'The server is currently unavailable. Please try again later.';
    }
  
    return errorMessage;
  };
  
  export default handleServerError;