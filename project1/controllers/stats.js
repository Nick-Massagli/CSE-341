const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('stats').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('stats').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createCharacter = async (req, res) => {
  const stat = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    strength: req.body.strength,
    dexterity: req.body.dexterity,
    constitution: req.body.constitution,
    intellegence: req.body.intellegence,
    wisdom: req.body.wisdom,
    charisma: req.body.charisma
  };
  const response = await mongodb.getDb().db().collection('stats').insertOne(stat);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the character.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createCharacter
};