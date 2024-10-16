const express = require('express');
const { getTicket, createTicket, updateTicket, deleteTicket } = require('../controllers/ticketController');

const router = express.Router();

router.get('/get-ticket', getTicket)
router.get('/get-ticket/:id', getTicket)

// router.get('/get-ticket',(req, res) =>{
//     TicketModel.find()
//     .then(tickets => res.json(tickets))
//     .catch(err => res.json(err))
// })

router.post('/create', createTicket)
router.put('/update/:id', updateTicket)
router.delete('/delete/:id', deleteTicket)

module.exports = router;