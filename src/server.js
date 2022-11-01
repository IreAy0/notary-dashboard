const compression = require('compression');
const express = require('express');

const app = express();
const path = `${__dirname}/build/`;
const port = 9090;

app.use(compression({ level: 9 }));
app.use(express.static(path));

const serveFile = (req, res) => {
  res.sendFile(`${path}index.html`);
};

app.all('/*', serveFile);

app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});

module.exports = app;
module.exports.serveFile = serveFile;
