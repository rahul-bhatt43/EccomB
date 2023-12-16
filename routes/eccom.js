const express = require('express');
const product = require('../controllers/products');



const router = express.Router();


router.post('/product', product.createProduct)
router.get('/getproducts', product.getProducts)
router.get('/product/:id', product.getProductsById)
router.delete('/delproduct/:id', product.deleteProductById)
router.put('/updateproduct', product.updateProductById)


module.exports = router;