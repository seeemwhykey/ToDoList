const express = require('express');
const router = express.Router();
const config = require('../config');
const checkAuth = require('../_middleware/check-auth');


const UserController = require('../_controllers/user');

//CREATE User
router.post("/signup", UserController.user_signup);


//LOGIN User
router.post("/login", UserController.user_login);

//DELETE User
router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;
