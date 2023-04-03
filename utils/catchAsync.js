module.exports = function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}


// const catchAsync = (fn) => {
//   return (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };
// };

// module.exports = { catchAsync };

