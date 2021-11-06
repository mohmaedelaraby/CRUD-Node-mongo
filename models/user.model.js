const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    username: { type: String, required: [true, 'Please enter your username!'] },
    password: { type: String, required: true },
    phone: {
        type: String, required: true,
        validate: {
            validator: (value) => value.length === 11,
            message: 'Phone must has 11 digits'
        }
    },
    address: String,
    email: { type: String, required: true },
})

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;