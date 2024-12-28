var express = require('express');
var authVerify = require('../middlewares/auth')

const { fetchProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

var productRouter = express.Router();

productRouter.get('/', authVerify, fetchProducts)
productRouter.post('/create', authVerify, createProduct)
productRouter.put('/update', authVerify, updateProduct)
productRouter.delete('/delete', authVerify, deleteProduct)
module.exports = productRouter;