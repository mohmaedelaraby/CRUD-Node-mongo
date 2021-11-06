const mongoose = require('mongoose');

// creaet schema
const categorySchema = new mongoose.Schema({
    cat_name: { type: String, required: true },
    cat_description: { type: String, maxlength: 300 },
    cat_image: String
})
// create model
const categoryModel = mongoose.model('Categories', categorySchema);
// export
module.exports = categoryModel;