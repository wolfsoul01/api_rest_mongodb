const { request, response } = require("express");

const getUser = (req = request, res = response) => {
  const {
    nombre = "No name",
    apiKey = "null",
    page = 1,
    limit = 5,
  } = req.query;

  res.json({
    msg: "get API -Controller",
    nombre,
    apiKey,
    page,
    limit,
  });
};

const postUser = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  console.log();
  res.status(201).json({
    msg: "post API -Controller",
    nombre,
    edad,
  });
};

const putUser = (req = request, res = response) => {
  const { userID } = req.params;
  res.status(200).json({
    msg: "put API -Controller",
    userID,
  });
};

const deletUser = (req = request, res = response) => {
  res.json({
    msg: "delete API -Controller",
  });
};

const pathcUser = (req = request, res = response) => {
  res.json({
    msg: "patch API -Controller",
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deletUser,
  pathcUser,
};
