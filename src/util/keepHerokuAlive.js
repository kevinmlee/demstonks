const express = require('express');
const { PORT } = require('../../constants');

const app = express();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

module.exports = app;
