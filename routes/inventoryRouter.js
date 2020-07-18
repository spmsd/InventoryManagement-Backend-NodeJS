const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Inventories = require('../models/inventories');
const cors = require('./cors');
const inventoryRouter = express.Router();

inventoryRouter.use(bodyParser.json());

// For all the items
inventoryRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    Inventories.find(req.query)
    .then((inventories) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(inventories);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
    Inventories.create(req.body)
    .then((inventory) => {
        console.log('Inventory Created ', inventory);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(inventory);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /inventories');
})
.delete(cors.corsWithOptions,(req, res, next) => {
    Inventories.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


// for specific item 
inventoryRouter.route('/:inventoryId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    Inventories.findById(req.params.inventoryId)
    .then((inventory) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(inventory);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /inventories/'+ req.params.inventoryId);
})
.put(cors.corsWithOptions, (req, res, next) => {
    Inventories.findByIdAndUpdate(req.params.inventoryId, {
        $set: req.body
    }, { new: true })
    .then((inventory) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(inventory);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Inventories.findByIdAndRemove(req.params.inventoryId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = inventoryRouter;