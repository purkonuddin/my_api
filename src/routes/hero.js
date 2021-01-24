const express = require("express");
const Route = express.Router(); 

const { getHeros, searchHero } = require("../controllers/hero");
 
Route.post("/", getHeros, searchHero);

module.exports = Route;
