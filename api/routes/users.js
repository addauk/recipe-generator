const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// const { MongoClient, ObjectId } = require("mongodb");
// const uri = "mongodb://localhost:27017/Makers_Adacemy"; // replace with your MongoDB URI

// // Define the name of the collection we want to use
// const collectionName = "Users";

// // Create a function to connect to the MongoDB database
// async function connectToDatabase() {
//   const client = new MongoClient(uri, { useUnifiedTopology: true });
//   await client.connect();
//   const db = client.db();
//   const collection = db.collection(collectionName);
//   return { client, collection };
// }

router.post("/", UsersController.Create);

// // Define the Create route to insert a new user document
// router.post("/", async (req, res) => {
//   try {
//     const { client, collection } = await connectToDatabase();
//     const result = await collection.insertOne(req.body);
//     res.send(result);
//     client.close();
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// });

router.get("/", UsersController.GetUser);

module.exports = router;
