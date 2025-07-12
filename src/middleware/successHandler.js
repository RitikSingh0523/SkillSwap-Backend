const successHandler = ({ status, data, message }) => {
  return{
    status,
    data,
    message,
  }
};

module.exports = successHandler;
