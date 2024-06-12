const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const connection = require('mongoose').connection;
const mongoHelper = require('./db/mongoConnection');
const router = require('./routes');

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const readme = fs.readFileSync('./README.md', 'utf-8');
  res.send(readme);
});

app.use('/api/v1/', router);

function errorHandler(err, req, res, next) {
  console.error(err.message);
  res.status(500).json({ name: 'Internal server error', message: err?.message, stack: err.stack });
  next();
}

app.use(errorHandler);
async function intialize() {
  try {
    await mongoHelper.connectToDBViaMongoose();
    if (connection.readyState === 1) {
      console.log('MongoDB successfully connected', connection.readyState);
      app.listen(port, () => {
        console.log(`Server is listening at port:${port}`);
      });
    }
  } catch (e) {
    console.log('Error initializing server----->', e);
    process.exit(0);
  }
}

(async () => { await intialize(); })();
