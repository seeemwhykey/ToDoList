const Product = require('../_models/product');
const mongoose = require('mongoose');


//GET ALL PRODUCTS
exports.products_get_all = (req, res, next) => {
  Product.find()
  .select('label _id')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          label: doc.label,
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
}


//CREATE PRODUCT
exports.products_create_product = (req, res, next) => {
  const product = new Product({
   _id: new mongoose.Types.ObjectId(),
   label: req.body.label
 });
 product
 .save()
 .then(result => {
   res.status(201).json({
       label: result.label,
       _id: result._id,
       request: {
         types: 'POST',
         url: 'http://localhost:8000/products/' + result._id
       }
   });
 })
 .catch(err => {
   console.log(err);
   res.status(500).json({
     error: err
   });
 });
}


//GET PRODUCT BY ID
exports.products_get_product_by_id = (req, res, next) => {
  const _id = req.params.productId;
  Product.findById(_id)
  .select('label _id')
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
}


//UPDATE PRODUCT
exports.products_update_product = (req, res, next) => {
  const _id = req.params.productId;
  const updateOps = {};


  Product.update({_id: _id}, {$set: req.body})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Product updated',
      request: {
        type: 'PATCH',
        url: 'http://localhost:8000/products/' + _id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
    error: err
    });
  });
}


//DELETE PRODUCT
exports.products_delete_product = (req, res, next) => {
  const _id = req.params.productId;
  Product.remove({_id: _id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Product deleted',
      request: 'POST',
      url: 'http://localhost:8000/products',
      body: {label: 'String'}
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}
