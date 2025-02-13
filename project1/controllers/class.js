const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('class').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('class').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createClass = async (req, res) => {
  const type = {
    name: req.body.name,
    mainStat: req.body.mainStat
  };
  const response = await mongodb.getDb().db().collection('class').insertOne(type);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the class.');
  }
};

const updateClass = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const type = {
    name: req.body.name,
    mainStat: req.body.mainStat
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('class')
    .replaceOne({ _id: userId }, type);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the class.');
  }
};

const deleteClass = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
  .getDb()
  .db()
  .collection('class')
  .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the class.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createClass,
  updateClass,
  deleteClass 
};