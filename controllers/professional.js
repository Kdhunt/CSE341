const db = require('../database/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getData = async (req, res, next) => {
  const result = await db.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
  });
};
const getDataById =  async (req, res, next) => {
  try {
    const id =  new ObjectId(req.params.id);
    const result = await db.getDb().db().collection('contacts').findOne({ _id: id });
    res.setHeader('Content-Type', 'application/json');
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Professional not found' });
    }
  }
  catch (error) {
    next(error);
  }
}
//create function for  router.post(professionalController.createData);
const createData = async (req, res, next) => {
  try {
    const contact = { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const result = await db.getDb().db().collection('contacts').insertOne(contact);
    if(result.acknowledged){
      res.status(200).json({ message: 'Professional inserted successfully' });
    } else {
      res.status(404).json({ message: 'Professional not inserted' });
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
    const contact = { 
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    }
    const result = await db.getDb().db().collection('contacts').replaceOne(
      { _id: id },
      contact
    );
    if(result.modifiedCount > 0){
      res.status(200).json({ message: 'Professional updated successfully' });
    } else {
      res.status(404).json({ message: 'Professional not found' });
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
    const result = await db.getDb().db().collection('contacts').deleteOne({ _id: id });
  if(result.deletedCount > 0){
      res.status(200).json({ message: 'Professional deleted successfully' });
    } else {
      res.status(404).json({ message: 'Professional not found' });
    }
  }
  catch(error){
    next(error);
  }
}
module.exports = { getData,  getDataById, updateData, createData, deleteData };