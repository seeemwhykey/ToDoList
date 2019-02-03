const express = require('express');
const router = express.Router();
const User = require('../_models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');


//SIGN UP USER
exports.user_signup = (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'This email address has already been used'
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            username: req.body.username
          });
          user.save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: 'User created'
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
           });
        }
      });
    }
  })
}


//LOGIN USER
exports.user_login = (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if(user.length < 1) {
      return res.status(401).json({
        message: "Authentifizierung fehlgeschlagen"
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(401).json({
          message: 'Authentifizierung fehlgeschlagen'
        });

      }
      if (result) {
        const token = jwt.sign(
          {
          email: user[0].email,
          userId: user[0].userId
          },
          config.JWT_KEY,
          {
            expiresIn: "24h"
          }
        );
        return res.status(200).json({
          message: 'Authentifizierung erfolgreich',
          token: token
        });
      }
      return res.status(401).json({
        message: 'Authentifizierung fehlgeschlagen'
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
   });
}


//DELETE USER
exports.user_delete = (req, res, next) => {
  User.remove({ _id : req.params.userId })
  .exec()
  .then(result => {
    res.status(200).json({
      message: "User successfully deleted"
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
   });
}
