const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Categories = require('../models/categories');
const Inventories = require('../models/inventories');

const categoryRouter = express.Router();

categoryRouter.use(bodyParser.json());

categoryRouter.route('/')  // all the request are chained to the  router
.get((req,res,next) => {
    Categories.find({})
    .then((categories) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(categories);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.end('POST operation not supported on /categories');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /categories');
})
.delete((req, res, next) => {
    res.end('Delete operation not supported on /categories');
});

// For specific category
categoryRouter.route('/:categoryId')
.get((req,res,next) => {
    Inventories.find( {categoryId : req.params.categoryId})
    .then((inventory) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(inventory);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /categories/'+ req.params.categoryId);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /categories/'+ req.params.categoryId);
})
.delete((req, res, next) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /categories/'+ req.params.categoryId);
});

module.exports = categoryRouter; // to export this file to index.js