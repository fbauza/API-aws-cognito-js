const async = require("async");
// const auth = require("../auth/auth.service");
const util = require("../Utilities/util");
const CongnitoUserDAO = require("../DAO/congnitoUserDAO");

/* Sing Up */
let signup = async (data, callback) => {
  if (!data.email || !data.username || !data.password) {
    callback({
      statusCode: util.statusCode.FOUR_ZERO_ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING,
    });
    console.log("ERROR datos signup", data);
    return;
  } else {
    try {
      let userData = {
        email: data.email,
        username: data.username,
        password: data.password,
      };
      console.log("userData signup", userData);
      const addUser = await CongnitoUserDAO.createUser(userData);
      if (addUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.USER_REGISTERED_SUCCESSFULLY,
          result: addUser,
        });
        return;
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: util.statusMessage.SERVER_BUSY,
        });
        return;
      }
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_FOUR,
        statusMessage: error.message,
      });
      return;
    }
  }
};
//_
/** Verificación usuario */
let verifyUser = async (data, callback) => {
  if (!data.email) {
    callback({
      statusCode: util.statusCode.ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING,
    });
    return;
  } else {
    try {
      let userData = { email: data.email, token: data.token };
      const authenticateUser = await CongnitoUserDAO.verifyUser(userData);
      if (authenticateUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.SUCESSFULLY_VERIFIED,
          result: authenticateUser,
        });
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: util.statusMessage.ENTER_VALID_PASS,
        });
      }
      return;
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: error.message,
      });
      return;
    }
  }
};

// /* Login con fetchUser */
let login = async (data, callback) => {
  if (!data.username || !data.password) {
    callback({
      statusCode: util.statusCode.ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING,
    });
    return;
  } else {
    try {
      let criteria = { username: data.username, password: data.password };
      const checkUser = await CongnitoUserDAO.fetchUser(criteria);
      if (checkUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.LOGGED_IN,
          result: checkUser,
        });
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: util.statusMessage.ENTER_VALID_PASS,
        });
      }
      return;
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: error,
      });
      return;
    }
  }
};

/** Cambio password */
let changePassword = async (data, callback) => {
  if (!data.username) {
    callback({
      statusCode: util.statusCode.ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING,
    });
    return;
  } else {
    try {
      let criteria = {
        username: data.username,
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      };
      const checkUser = await CongnitoUserDAO.changePassword(criteria);
      if (checkUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.PASSWORD_CHANGED,
          result: checkUser,
        });
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: util.statusMessage.ENTER_VALID_PASS,
        });
      }
      return;
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: error.message,
      });
      return;
    }
  }
};

/** olvido password */
let forgotPassword = async (data, callback) => {
  if (!data.username) {
    callback({
      statusCode: util.statusCode.ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING,
    });
    return;
  } else {
    try {
      let criteria = { username: data.username };
      const checkUser = await CongnitoUserDAO.forgotPassword(criteria);
      if (checkUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.MAIL_SENT_FORGOT_PASSWORD,
          result: checkUser,
        });
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: "FAILED",
        });
      }
      return;
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: error.message,
      });
      return;
    }
  }
};

/** Reseteo password */
let resetPassword = async (data, callback) => {
  if (!data.username) {
    callback({
      statusCode: util.statusCode.ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING,
    });
    return;
  } else {
    try {
      let criteria = {
        token: data.token,
        password: data.password,
        username: data.username,
      };
      const checkUser = await CongnitoUserDAO.resetPassword(criteria);
      if (checkUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.SUCCESS,
          result: checkUser,
        });
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: "FAILED",
        });
      }
      return;
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: error.message,
      });
      return;
    }
  }
};

module.exports = {
  signup: signup,
  login: login,
  verifyUser: verifyUser,
  changePassword: changePassword,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
};
