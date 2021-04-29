var count = 0;
module.exports.countRequest = (req, res, next) => {
  if (req.cookies) {
    count+=1;
  }
  next();
};