const db = require('../database/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getData = async (req, res, next) => {
  const result = await db.getDb().db().collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
  });
};
const getDataById =  async (req, res, next) => {
  try {
    const id =  new ObjectId(req.params.id);
    const result = await db.getDb().db().collection('users').findOne({ _id: id });
    res.setHeader('Content-Type', 'application/json');
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
  catch (error) {
    next(error);
  }
}
//create function for  router.post(professionalController.createData);
const createData = async (req, res, next) => {
  try {
    const user = {
      username: req.body.username,
      email:req.body.email,
      password: req.body.hashed_password,
      role: req.body.role,
      created_at: req.body.create_DateTime,
      updated_at: Date.now()
    }
    const result = await db.getDb().db().collection('users').insertOne(user);
    if(result.acknowledged){
      res.status(200).json({ message: 'User inserted successfully' });
    } else {
      res.status(404).json({ message: 'User not inserted' });
    }
  }
  catch (error) {
    next(error);
  }
}
// create function for router.put('/:id', professionalController.updateData);
const updateData = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const user = {
      username: req.body.username,
      email:req.body.email,
      password: req.body.password,
      role: req.body.role,
      created_at: req.body.create_DateTime,
      updated_at: Date.now()
    }
    const result = await db.getDb().db().collection('users').replaceOne(
      { _id: id },
      user
    );
    if(result.modifiedCount > 0){
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
  catch (error) {
    next(error);
  }
}

//create function for  router.delete('/:id', professionalController.deleteData);
const deleteData = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await db.getDb().db().collection('users').deleteOne({ _id: id });
  if(result.deletedCount > 0){
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
  catch(error){
    next(error);
  }
}
module.exports = { getData,  getDataById, updateData, createData, deleteData };