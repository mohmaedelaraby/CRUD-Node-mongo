const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');

router.post('', (req, res) => {
    const { username, password, address, phone, email } = req.body;

    const user = new userModel({
        _id: mongoose.Types.ObjectId(),
        username, password, address, phone, email
    });

    user.save()
        .then(doc => res.json({ message: 'User has been addedd successfully', id: doc._id }))
        .catch(err => res.json({ message: 'Error', error: err }))

})
router.get('/', (req, res) => {
    userModel.find()
        // .select('username address')
        .then(users => res.json({ message: 'Success', data: users }))
        .catch(err => res.status(403).json({ message: 'Something went wrong', err }))
})
router.get('/:username', (req, res) => {
    const username = req.params.username;
    userModel.findOne({ username: username })
        .select('email')
        .then(user => res.json({ message: 'Success', data: user }))
        .catch(err => res.status(403).json({ message: 'Something went wrong', err }))
})
router.put('/:id', (req, res) => {
    const { username, password, address, phone, email } = req.body;
    userModel.findOneAndUpdate({ _id: req.params.id },
        { username, password, address, phone, email })
        .then(doc => res.json({ message: 'Success', data: doc }))
        .catch(err => res.status(403).json({ message: 'Something went wrong', err }))
})
router.delete('/:id', async (req, res) => {
    const deletedUser = await userModel.findOneAndDelete({ _id: req.params.id })
    if (deletedUser) {
        res.json({ message: 'Success', data: deletedUser })
    } else {
        res.json({ message: 'There is no data to delete' })
    }
})

module.exports = router;