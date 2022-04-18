const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;

exports.connect = async () => {
    if (mongod === undefined)
        mongod = await MongoMemoryServer.create();

    await mongoose.connect(mongod.getUri(), {
        useNewUrlParser: true,
    });
};

exports.close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

exports.clear = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};
