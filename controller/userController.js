const User = require("../model/userSchema");
const genKey = require("../util/apiKey");

exports.sample = function (req, res) {
  res.send("Greetings from the Sample controller!");
};
//

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const apikey = genKey.genKey();
  try {
    const user = await User.create({
      name,
      email,
      password,
      apiKey: apikey,
    });
    res.status(201).json({
      status: "success",
      data: {
        user,
        your_api_key: apikey,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
