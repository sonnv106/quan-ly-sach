module.exports.checkId = (req, res, next) => {
  var errors = [];
  if (!req.params.id) {
    errors.push("Id is invalid");
  }
  if (errors.length) {
    res.render("transaction", {
      errors: errors
    });
    return;
  }
  next();
};
