const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Categories = require('../models/categories');
const Inventories = require('../models/inventories');
const cors = require('./cors');
const categoryRouter = express.Router();

categoryRouter.use(bodyParser.json());

categoryRouter.route('/')  // all the request are chained to the  router
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    Categories.find(req.query)
    .then((categories) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(categories);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
    Categories.create(req.body)
    .then((category) => {
        console.log('category Created ', category);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(category);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /categories');
})
.delete(cors.corsWithOptions,(req, res, next) => {
    Categories.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// For specific category
categoryRouter.route('/:categoryName')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    Inventories.find( {categories : req.params.categoryName})
    .then((inventory) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(inventory);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /categories/'+ req.params.categoryId);
})
.put(cors.corsWithOptions,(req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /categories/'+ req.params.categoryId);
})
.delete(cors.corsWithOptions,(req, res, next) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /categories/'+ req.params.categoryId);
});

module.exports = categoryRouter; // to export this file to index.js