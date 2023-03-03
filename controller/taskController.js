const Task = require("../model/tasksSchema");
const User = require("../model/userSchema");

// exports.test = function (req, res) {
//   res.send(" from authenticated and Greetings from the Test controller!");
// };

exports.create = async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);

  let task = await Task.create({
    name: req.body.name,
    description: req.body.description,
    completed: req.body.status,
    assingnee: {
      name: user.name,
      email: user.email,
    },
  });

  if (!task) {
    res.status(500).send("Error creating task , please try again later");
  }

  res.status(200).json(task);
};

exports.delete = async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(500).json({
      status: "fail",
      message: "Error deleting task , user not found",
    });
  }

  const task = await Task.findById(req.params.id);

  // console.log(task);
  if (!task) {
    res.status(500).json({
      status: "fail",
      message: "Error deleting task",
    });
  }

  if (task.assingnee.email !== user.email) {
    res.status(401).json({
      status: "fail",
      message: "You are not authorized to delete this task",
    });
  }

  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Task deleted successfully",
  });
};

exports.all = async function (req, res) {
  const task = await Task.find();
  res.status(200).json(task);
};
