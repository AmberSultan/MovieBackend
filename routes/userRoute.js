const express = require('express');
const router = express.Router();
const {
    authenticateToken,
    signupValidation,
    loginValidation
} = require('../middleware/authenticateToken');

const {
    registerUser,
    loginUser,
    getUsers,
    // createUsers,
    updateUsers,
    deleteUsers
} = require('../controllers/userController');
const UserModel = require('../models/UserModel');

router.post('/signup', signupValidation, registerUser);
router.post('/login', loginValidation, loginUser);


// router.get('/get-users/:id', authenticateToken, getUsers);
// router.post('/create', authenticateToken, createUsers);
// router.get('/get-users', getUsers);

router.get('/get-users',(req, res) =>{
        UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

router.put('/update/:id', authenticateToken, updateUsers);
router.delete('/delete/:id', authenticateToken, deleteUsers);

module.exports = router;
