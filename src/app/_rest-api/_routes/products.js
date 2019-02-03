const express = require('express');
const router = express.Router();
const ProductsController = require('../_controllers/products');
const checkAuth= require('../_middleware/check-auth')

//GET requests to /products
router.get('/', ProductsController.products_get_all);



//GET Request to one specific product by ID
router.get('/:productId', ProductsController.products_get_product_by_id);


//POST request to /products
router.post('/', checkAuth, ProductsController.products_create_product);



//UPDATE requests to /products
router.patch('/:productId', checkAuth, ProductsController.products_update_product);


//DELETE requests to /products
router.delete('/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;
