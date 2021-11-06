const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const users = require('./routers/user.router');
const categories = require('./routers/category.router');
const products = require('./routers/product.router');


mongoose.connect('mongodb://localhost:27017/mean',
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Database is connected...'))
    .catch((err) => console.log('Error:', err))

app.use(express.json());

app.use('/api/users', users);
app.use('/api/categories', categories);
app.use('/api/products', products);


app.get('/', (req, res) => {
    res.send('Server is Up and Running ...')
})


app.listen(3000);