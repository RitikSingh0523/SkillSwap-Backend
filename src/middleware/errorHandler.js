const errorHandler = ({ status,  message }) => {
  return{
    status,
    message,
  }
};

module.exports = errorHandler;
