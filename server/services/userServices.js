import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
export const registerService = ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkIsEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
      let isUsedEmail = await User.find({ email: email });
      let isUsedName = await User.find({ username });
      if (checkIsEmail(email)) {
        if (isUsedEmail.length || isUsedName.length) {
          resolve({
            status: "error",
            message: "The email or the username is exist",
          });
        }
        if (password !== confirmPassword) {
          resolve({
            status: "error",
            message: "Password does not match",
          });
        }
        let hashPassword = bcrypt.hashSync(password, 10);
        let newUser = User.create({ email, password: hashPassword, username });
        resolve({
          status: "OK",
          message: {
            username: (await newUser).username,
            email: (await newUser).email,
            password: (await newUser).password,
          },
        });
      } else resolve({ status: "error", message: "Incorrect email format" });
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

export const loginService = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkIsEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
      let isUsedEmail = await User.find({ email: email });
      if (checkIsEmail(email)) {
        if (isUsedEmail.length > 0) {
          let hashPasswordLogin = bcrypt.hashSync(password, 10);
          // console.log(hashPasswordLogin);
          // console.log(isUsedEmail[0]?.password);
          if (!bcrypt.compareSync(password, isUsedEmail[0]?.password)) {
            resolve({
              status: "error",
              message: "The password is failed",
            });
          } else {
            // const access_token = generalAcessToken({
            //   isAdmin: isUsedEmail[0].isAdmin,
            //   _id: isUsedEmail[0]._id,
            // });
            // const refresh_token = generalRefreshToken({
            //   isAdmin: isUsedEmail[0].isAdmin,
            //   _id: isUsedEmail[0]._id,
            // });
            // console.log("access_token", access_token);
            // console.log("refresh_token", refresh_token);
            console.log(isUsedEmail);
            const userFind = [isUsedEmail];
            resolve({
              status: "OK",
              message: {
                userFind,
                // access_token,
                // refresh_token,
              },
            });
          }
        } else {
          resolve({
            status: "err",
            message: "The email is not exist",
          });
        }
      }
    } catch (error) {
      reject({
        status: "err",
        message: error.message,
      });
    }
  });
};

export const setAvatarService = ({ userId, avatarImage }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      // console.log(await User.findById(userId));
      resolve({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (error) {
      reject({
        status: "err",
        message: error.message,
      });
    }
  });
};

export const getAllUserService = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      // lay full contact tru current user
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      if (!users) {
        resolve({
          status: "err",
          message: "No contact",
        });
      }
      resolve({
        status: "OK",
        message: users,
      });
    } catch (error) {
      reject({
        status: "err",
        message: error,
      });
    }
  });
};
