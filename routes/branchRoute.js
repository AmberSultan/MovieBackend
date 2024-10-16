const express = require('express');
const { getBranch, createBranch, updateBranch, deleteBranch } = require('../controllers/branchController');

const router = express.Router();

router.get('/get-branch', getBranch)
router.get('/get-branch/:id', getBranch)
router.post('/create', createBranch)
router.put('/update/:id', updateBranch)
router.delete('/delete/:id', deleteBranch)

module.exports = router;