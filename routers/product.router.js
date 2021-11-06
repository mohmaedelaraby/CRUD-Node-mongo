const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');

router.get('/', (req, res) => {
    productModel.find().skip(2).limit(10)
        .populate('category', 'cat_name cat_image')
        // .populate('brand', 'cat_name cat_image')
        .then(products => {
            if (products.length) {
                res.json({ message: 'Success', data: products })
            } else {
                res.json({ message: 'No Data' })
            }
        })
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    productModel.findById(id)
        .then(product => res.json({ message: 'Success', data: product }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

router.post('/', (req, res) => {
    const { name, price, description, image, category } = req.body;
    const product = new productModel({
        name, price, description, image, category
    });
    product.save()
        .then(product => res.json({ message: 'Success', data: product }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    productModel.findByIdAndRemove(id)
        .then(product => res.json({ message: 'Success', data: product }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, price, description, image, category } = req.body;
    productModel.findByIdAndUpdate(id, { name, price, description, image, category })
        .then(product => res.json({ message: 'Success', data: product }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

router.get('/getByCategory/:cat_id', (req, res) => {
    productModel.find({ category: req.params.cat_id })
        .then(products => res.json({ message: 'Success', data: products }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

router.get('/moreThan/:price', (req, res) => {
    const priceParam = req.params.price;
    // productModel.find({price: {$gte: priceParam}})
    productModel.find().where('price').gt(priceParam)
        .then(products => res.json({ message: 'Success', data: products }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

module.exports = router;