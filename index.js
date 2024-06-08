import express from 'express';
import bodyParser from 'body-parser';

import db from "./mongoConnection.js";

const port = process.env.PORT || 4000;
const app = express();
import cors from 'cors'
app.use(cors())
// app.use((_req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
  
//     next();
//   });

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
 
// Parses the text as json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World, from express after rename');
})

app.post('/addUser',async (req, res) => {
    let collection = await db.collection("users");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    console.log("rreq"+req.body);
    res.send(result).status(204);
});

app.get('/getUsers', async(req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({})
      
      .toArray();
    res.send(results).status(200);
});

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});
 