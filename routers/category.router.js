const express = require('express');
const router = express.Router();
const categoryModel = require('../models/category.model');

router.get('/', (req, res) => {
    categoryModel.find()
        .then(categories => res.json({ message: 'Success', data: categories }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    categoryModel.findById(id)
        .then(category => res.json({ message: 'Success', data: category }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

router.post('/', (req, res) => {
    const { cat_name, cat_description, cat_image } = req.body;
    const category = new categoryModel({
        cat_name, cat_description, cat_image
    });
    category.save()
        .then(category => res.json({ message: 'Success', data: category }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    categoryModel.findByIdAndRemove(id)
        .then(category => res.json({ message: 'Success', data: category }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { cat_name, cat_description, cat_image } = req.body;
    categoryModel.findByIdAndUpdate(id, { cat_name, cat_description, cat_image })
        .then(category => res.json({ message: 'Success', data: category }))
        .catch(err => res.status(403).json({ message: 'Error', err }))
})

module.exports = router;