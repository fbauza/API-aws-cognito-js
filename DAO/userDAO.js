"use strict";

var Models = require("../Models/User");

const getUser = (criteria) =>
  new Promise((resolve, reject) => {
    Models.findOne(criteria)
      .exec()
      .then((client) => resolve(client))
      .catch((err) => reject(err));
  });

const createUser = (objToSave) =>
  new Promise((resolve, reject) => {
    new Models(objToSave)
      .save()
      .then((client) => resolve(client))
      .catch((err) => reject(err));
  });

const updateUser = (criteria, dataToSet, options) =>
  new Promise((resolve, reject) => {
    options.lean = true;
    options.new = true;
    new Models(objToSave)
      .save()
      .then((client) => resolve(client))
      .catch((err) => reject(err));
  });

const deleteUser = (criteria) =>
  new Promise((resolve, reject) => {
    Models.findOneAndRemove(criteria)
      .exec()
      .then((client) => resolve(client))
      .catch((err) => reject(err));
  });

module.exports = {
  updateUser: updateUser,
  createUser: createUser,
  deleteUser: deleteUser,
  getUser: getUser,
};
