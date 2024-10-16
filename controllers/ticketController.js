const Ticket = require('../models/TicketModel');
const Movie = require('../models/MovieModel');

// const getTicket = async (req, res) => {
//     try {
//         const tickets = await Ticket.find({})
//             .populate({
//                 path: 'movie',
//                 select: 'title schedule',
//             })
//             .populate({
//                 path: 'hall',
//                 select: 'hallname'
//             });
        
//         res.status(200).json({
//             success: true,
//             message: "Tickets retrieved successfully",
//             data: tickets
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve tickets",
//             error: err.message
//         });
//     }
// };


// const getTicket = async (req, res) => {
//     try {
//         const { movieId, seatNumber } = req.query;
        
//         // Create a filter object
//         let filter = {};
        
//         if (movieId) {
//             filter.movie = movieId;
//         }

//         if (seatNumber) {
//             filter.seat = { $in: [seatNumber] }; // Assuming seat is an array
//         }

//         const tickets = await Ticket.find(filter)
//             .populate({
//                 path: 'movie',
//                 select: 'title schedule',
//             })
//             .populate({
//                 path: 'hall',
//                 select: 'hallname'
//             });
        
//         res.status(200).json({
//             success: true,
//             message: "Tickets retrieved successfully",
//             data: tickets
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve tickets",
//             error: err.message
//         });
//     }
// };

const getTicket = async (req, res) => {
    try {
        const { seatNumber } = req.query;
        let filter = {};

        if (seatNumber) {
            const seatArray = seatNumber.split(',');
            filter.seat = { $all: seatArray };
        }

        const tickets = await Ticket.find(filter)
            .populate({
                path: 'movie',
                select: 'title schedule',
            })
            .populate({
                path: 'hall',
                select: 'hallname'
            });
        
        res.status(200).json({
            success: true,
            message: "Tickets retrieved successfully",
            data: tickets
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tickets",
            error: err.message
        });
    }
};







const createTicket = async (req, res) => {
    const { movie, hall, seat, totalSeats, totalPrice } = req.body;
    const user = req.user_id;

    try {
        
        const ticket = await Ticket.create({ movie, hall, seat, user, totalSeats, totalPrice });
        const populatedTicket = await Ticket.findById(ticket._id)
            .populate({
                path: 'movie',
                select: 'title rating schedule',
            })
            .populate({
                path: 'hall',
                select: 'hallname'
            
            })
            .exec();

        res.status(201).json({
            success: true,
            message: "Ticket created successfully",
            data: populatedTicket
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to create ticket",
            error: err.message
        });
    }
};

const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { movie, hall, seat, user, totalSeats, totalPrice } = req.body;

    try {
        const ticket = await Ticket.findByIdAndUpdate(
            id,
            { movie, hall, seat, user, totalSeats, totalPrice },
            { new: true }
        ).populate({
            path: 'movie',
            select: 'title schedule', // Adjust fields as needed
        });

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Ticket updated successfully",
            data: ticket
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to update ticket",
            error: err.message
        });
    }
};

const deleteTicket = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findByIdAndDelete(id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Ticket deleted successfully",
            data: ticket
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to delete ticket",
            error: err.message
        });
    }
};

module.exports = {
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
};
