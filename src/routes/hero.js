const express = require("express");
const Route = express.Router(); 

const { getHeros, searchHero } = require("../controllers/hero");

Route.get("/", getHeros, searchHero);

module.exports = Route;
