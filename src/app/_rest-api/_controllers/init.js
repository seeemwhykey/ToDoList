const mongoose = require('mongoose');
const UserController = require('./user');
const ProductController = require('./products');

const dummyResponse = {
  status: () => {
    return { json: () => {} }
  }
};

const defaultUser = {
  body: {
    email: "test@example.com",
    username: "test",
    password: "test"
  }
};

const defaultUser2 = {
  body: {
    email: "test8@example.com",
    username: "test8",
    password: "test8"
  }
};

const createProduct = (label, position, checked) => {
  ProductController.products_create_product(
    {
      body: {
        label: label,
        position: position,
        checked: checked
      }
    },
    dummyResponse, null);
};

exports.init = () => {
  // create default user
  UserController.user_signup(defaultUser, dummyResponse, null);
  UserController.user_signup(defaultUser2, dummyResponse, null);

  // create default products only if database is empty
  ProductController.products_get_all(null,
    {
      status: (status) => {
        console.log("Status" + status);
        return {
          json: (data) => {
            console.log(JSON.stringify(data));
            if (status === 200 && !data.count) {
              // Database is empty => create Default products
              createProduct("Äpfel", 0, false);
              createProduct("Birnen", 1, false);
              createProduct("Käse", 2, true);
            }
          }
        }
      }
    });
};
