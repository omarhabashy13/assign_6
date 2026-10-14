const express = require("express");
const bootstrap = require("./src/app.controller");

const app = express();
const port = process.env.PORT || 3000;

bootstrap(app, express, port);
