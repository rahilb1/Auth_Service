const express = require("express");
const {PORT} = require("./config/serverConfig");

const app = express();

const prepareAndStartServer = () => {
  app.listen(3001, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

prepareAndStartServer();
