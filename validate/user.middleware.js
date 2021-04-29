module.exports.postCreate = (req, res, next) => {
  var errors = [];
  if (!req.body.name) {
    errors.push("Name is not require");
  }
  if (req.body.name.length > 30) {
    errors.push("Name is too long");
  }
  if (!req.body.phone) {
    errors.push("Phone is not require");
  }
  if (!req.body.email) {
    errors.push("Email is not require");
  }
  if (!req.body.password) {
    errors.push("Password is not require");
  }
  if (errors.length) {
    res.render("create-user", {
      errors: errors,
      values: req.body
    });
    return;
  }
  next()
};
