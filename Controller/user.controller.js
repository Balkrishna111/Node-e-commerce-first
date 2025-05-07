const User = require("../Model/user.model");

exports.createUser = (req, res, next) => {
  const { userName, email } = req.body;

  if (!userName || !email) {
    res.status(400).send({
      message: "Bad Request",
    });
  } else {
    User.find({ email: req.body.email })
      .exec()
      .then((result) => {
        if (result.length) {
          userAlreadyExists = true;
          res.status(400).send({
            message: "User already exists",
          });
        } else {
          const user = new User({ userName, email });
          user
            .save()
            .then(() => {
              res.status(200).send({
                message: "User Created successfully",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
