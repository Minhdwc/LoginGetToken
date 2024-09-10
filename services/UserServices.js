const User = require("../model/user");
const bcrypt = require("bcrypt");
const authMiddleWare = require("../middleware/authMiddleware");
const CreateUserServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, password, comfirmPassword, dateOfBirth, email, role } = data;
    try {
      const hash = bcrypt.hashSync(password, 10);
      const createUser = await User.create({
        name,
        password: hash,
        comfirmPassword: hash,
        dateOfBirth,
        email,
        role,
      });
      if (createUser) {
        resolve({
          status: "created",
          message: "User created",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailServices = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });
      resolve({
        status: "Found",
        message: "User found",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllUserServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find({});
      resolve({
        status: "All users",
        message: "All user has found",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updateUserServices = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id.length !== 24) {
        resolve({
          status: "Invalid id",
          message: "Invalid User Id",
        });
        return;
      }
      const checkUser = await User.findById(id);
      if (!checkUser) {
        resolve({
          status: "User not found",
          message: "Can not found user",
        });
        return;
      }
      const updateUserServices = User.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "Success",
        message: "Update success",
        data: updateUserServices,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteUserServices = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id.length !== 24) {
        resolve({
          status: "Invalid id",
          message: "Invalid User Id",
        });
        return;
      }
      const checkUser = await User.findById(id);
      if (!checkUser) {
        resolve({
          status: "User not found",
          message: "Can not found user",
        });
        return;
      }
      await User.findByIdAndDelete(id);
      resolve({
        status: "Deleted",
        message: "User has deleted",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const login = (emailS, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const emailUser = await User.findOne({ email: emailS });
      if (!emailUser) {
        resolve({
          status: "Error",
          message: "User not found",
        });
        return;
      }
      const checkPass = await bcrypt.compare(password, emailUser.password);
      if (!checkPass) {
        resolve({
          status: "Error",
          message: "Password is incorrect",
        });
        return;
      }
      const data = {
        _id: emailUser.id,
        name: emailUser.name,
        email: emailUser.email,
        role: emailUser.role,
      };
      const accessToken = await authMiddleWare.generateToken(
        data,
        process.env.ACCESS_TOKEN_SECRET,
        "24h"
      );

      resolve({
        status: "Success",
        message: "Login successful",
        data: {
          user: {
            _id: emailUser.id,
            name: emailUser.name,
            email: emailUser.email,
            role: emailUser.role,
          },
          token: accessToken,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  CreateUserServices,
  getDetailServices,
  getAllUserServices,
  updateUserServices,
  deleteUserServices,
  login,
};
