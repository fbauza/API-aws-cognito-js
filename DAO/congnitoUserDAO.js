"use strict";

const congnitoConfig = require("../Utilities/congnito-config").config;
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
global.fetch = require("node-fetch");

const poolData = {
  UserPoolId: congnitoConfig.COGNITO_IDENTITY_POOL_ID,
  ClientId: congnitoConfig.AMAZON_CLIENT_ID,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/**Method for user register API */
const createUser = (objToSave) =>
  new Promise((resolve, reject) => {
    let attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: objToSave.email,
      }),
    ];

    userPool.signUp(
      objToSave.username,
      objToSave.password,
      attributeList,
      null,
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          let cognitoUser = result.user;
          console.log("user name is " + cognitoUser.getUsername());
          resolve(result);
        }
      }
    );
  });

/**Method for verify user API */
const verifyUser = (objToSave) =>
  new Promise((resolve, reject) => {
    var userData = {
      Username: objToSave.email,
      Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(objToSave.token, true, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });

/* Method for fetch user API */
const fetchUser = (criteria) =>
  new Promise((resolve, reject) => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: criteria.username,
        Password: criteria.password,
      }
    );

    let userData = {
      Username: criteria.username,
      Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        //console.log("access token + " + result.getAccessToken().getJwtToken());
        //console.log("id token + " + result.getIdToken().getJwtToken());
        //console.log("refresh token + " + result.getRefreshToken().getToken());
        resolve(result);
      },
      onFailure: function (err) {
        console.log(err);
        reject(err);
      },
    });
  });

/**API to change the user password */
const changePassword = (objToSave) =>
  new Promise((resolve, reject) => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: objToSave.username,
        Password: objToSave.oldPassword,
      }
    );

    const userData = {
      Username: objToSave.username,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    // console.log(authenticationDetails,'authentication details-sdsdsdsd----');
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        cognitoUser.changePassword(
          objToSave.oldPassword,
          objToSave.newPassword,
          (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(result);
          }
        );
      },
      onFailure: function (err) {
        reject(err);
        console.log(err);
      },
    });
  });

const forgotPassword = (objToSave) =>
  new Promise((resolve, reject) => {
    const userData = {
      Username: objToSave.username,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: function (result) {
        resolve(result);
        //console.log('call result: ' + result);
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });

const resetPassword = (objToSave) =>
  new Promise((resolve, reject) => {
    const userData = {
      Username: objToSave.username,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmPassword(objToSave.token, objToSave.password, {
      onFailure(err) {
        // console.log(err);
        reject(err);
      },
      onSuccess() {
        resolve(true);
        console.log("Success");
      },
    });
  });

module.exports = {
  fetchUser: fetchUser,
  createUser: createUser,
  verifyUser: verifyUser,
  changePassword: changePassword,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
};
