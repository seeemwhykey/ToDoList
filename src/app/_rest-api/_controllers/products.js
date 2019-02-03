const Product = require('../_models/product');
const mongoose = require('mongoose');


//GET ALL PRODUCTS
exports.products_get_all = (req, res, next) => {
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
}


//CREATE PRODUCT
exports.products_create_product = (req, res, next) => {
  const product = new Product({
   _id: new mongoose.Types.ObjectId(),
   name: req.body.label
 });
 product
 .save()
 .then(result => {
   console.log(result);
   res.status(201).json({
     message: 'Created product successfully',
     createdProduct: {
       name: result.name,
       _id: result._id,
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
}


//GET PRODUCT BY ID
exports.products_get_product_by_id = (req, res, next) => {
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
}


//UPDATE PRODUCT
exports.products_update_product = (req, res, next) => {
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
}


//DELETE PRODUCT
exports.products_delete_product = (req, res, next) => {
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
}
