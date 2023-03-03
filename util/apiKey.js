const User = require("../model/userSchema");

exports.genKey = () => {
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("");
};

exports.authenticate = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const email = req.body.email;
  // console.log(apiKey);
  if (!apiKey) {
    res.status(401).json({
      status: "fail",
      message: "No API key provided",
    });
  }
  const user = await User.findOne({ email: email });
  // console.log(user);

  if (!user) {
    res.status(401).json({
      status: "fail",
      message: "invalid user",
    });
  }
  if (user.apiKey !== apiKey) {
    res.status(401).json({
      status: "fail",
      message: "Invalid API key",
    });
  }

  next();
};
