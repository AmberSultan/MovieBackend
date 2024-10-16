const express = require('express');
const { getOrganization, createOrganization, updateOrganization, deleteOrganization } = require('../controllers/organizationController');

const router = express.Router();

router.get('/get-organization', getOrganization)
router.post('/create', createOrganization)
router.put('/update/:id', updateOrganization)
router.delete('/delete/:id', deleteOrganization)

module.exports = router;

