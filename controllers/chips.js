const db = require('../database/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getData = async (req, res, next) => {
  const result = await db.getDb().db().collection('potato_chips').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
  });
};
const getDataById =  async (req, res, next) => {
  try {
    const id =  new ObjectId(req.params.id);
    const result = await db.getDb().db().collection('potato_chips').findOne({ _id: id });
    res.setHeader('Content-Type', 'application/json');
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Potato Chip not found' });
    }
  }
  catch (error) {
    next(error);
  }
}
//create function for  router.post(professionalController.createData);
const createData = async (req, res, next) => {
  try {
    const data = {
      "brand": req.body.brand,
      "flavor": req.body.flavor,
      "type": req.body.type,
      "production_cost": req.body.cost,
      "retail_price": req.body.price,
      "nutritional_value": req.body.nutritional_value,
      "ingredients": req.body.ingredients,
      "image": req.body.image 
    }
    const result = await db.getDb().db().collection('potato_chips').insertOne(data);
    if(result.acknowledged){
      res.status(200).json({ message: 'Potato Chip inserted successfully' });
    } else {
      res.status(404).json({ message: 'Potato Chip not inserted' });
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
    const data = {
      "brand": req.body.brand,
      "flavor": req.body.flavor,
      "type": req.body.type,
      "production_cost": req.body.cost,
      "retail_price": req.body.price,
      "nutritional_value": req.body.nutritional_value,
      "ingredients": req.body.ingredients,
      "image": req.body.image 
    }
    const result = await db.getDb().db().collection('potato_chips').replaceOne(
      { _id: id },
      data
    );
    if(result.modifiedCount > 0){
      res.status(200).json({ message: 'Potato Chip updated successfully' });
    } else {
      res.status(404).json({ message: 'Potato Chip not found' });
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
    const result = await db.getDb().db().collection('potato_chips').deleteOne({ _id: id });
  if(result.deletedCount > 0){
      res.status(200).json({ message: 'Potato Chip deleted successfully' });
    } else {
      res.status(404).json({ message: 'Potato Chip not found' });
    }
  }
  catch(error){
    next(error);
  }
}
module.exports = { getData,  getDataById, updateData, createData, deleteData };