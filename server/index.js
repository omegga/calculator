/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const { PORT } = process.env;
if (!PORT) {
  throw new Error('missing environment variables');
}

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use((req, res) => {
  res.status(404).send('not found');
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
