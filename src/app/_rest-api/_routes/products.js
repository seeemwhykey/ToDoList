const express = require('express');
const router = express.Router();
const Product = require('../_models/product');
const mongoose = require('mongoose');
const checkAuth= require('../_middleware/check-auth')

//GET requests to /products
router.get('/', (req, res, next) => {
  Product.find()
  .select('name _id')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          name: doc.name,
          _id: doc._id,
          request: {
            types: 'GET',
            url: 'http://localhost:8000/products/' + doc._id
          }
        }
      })
    };
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      err: error
    });
  })
});



//GET Request to one specific product by ID
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .select('name _id')
  .exec()
  .then(doc => {
    console.log(doc);
    if (doc) {
      res.status(200).json(doc);
    } else {
        res.status(404).json({
          product: doc,
              request: {
                type: 'GET',
                description: 'GET_ALL_PRODUCTS',
                url: 'http://localhost:8000/products'
              }
        });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  })
});


//POST request to /products
router.post('/', checkAuth, (req, res, next) => {
   const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });
  product
  .save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Created product successfully',
      createdProduct: {
        name: result.name,
        _id: result_id,
        request: {
          types: 'GET',
          url: 'http://localhost:8000/products/' + result._id
        }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});



//UPDATE requests to /products
router.patch('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({_id: id}, {$set: updateOps})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Product updated',
      request: {
        type: 'GET',
        url: 'http://localhost:8000/products/' + id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
    error: err
    });
  });
});


//DELETE requests to /products
router.delete('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId;
  Product.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Product deleted',
      request: 'POST',
      url: 'http://localhost:8000/products',
      body: {name: 'String'}
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
