const killmenow = require('../database/poolofstupid');

class ObjectModel {
    constructor() {
        this.init();
    }

    async init() {
        this.db = await killmenow.getDb().db();
        this.collection = this.db.collection('ClusterF');
    }

    async getData() {
        try {
            const result = await this.collection.find({}).toArray();
            return result; // Returns the array of documents
        } catch (error) {
            throw new Error('Failed to retrieve data');
        }
    }

    async putData(newItem) {
        try {
            const result = await this.collection.insertOne(newItem);
            return result.ops[0]; // Return the inserted document
        } catch (error) {
            throw new Error('Failed to insert data');
        }
    }

    async updateData(id, updateData) {
        try {
            const result = await this.collection.updateOne(
                { _id: id },
                { $set: updateData }
            );
            if (result.modifiedCount === 0) {
                throw new Error('No document found with the given ID');
            }
            return await this.collection.findOne({ _id: id });
        } catch (error) {
            throw new Error('Failed to update data');
        }
    }
}

module.exports = new objectModel();