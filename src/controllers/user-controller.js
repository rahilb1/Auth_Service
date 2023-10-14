const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      message: "User created",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
};
const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      message: "User signed in",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong in the controller",
      data: {},
      success: false,
      err: error,
    });
  }
};
const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "User is authenticated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong in the controller",
      data: {},
      success: false,
      err: error,
    });
  }
};
const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "Successfully fetched whether the user is an admin",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong in the controller",
      data: {},
      success: false,
      err: error,
    });
  }
};
module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
