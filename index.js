const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

require('./databaseConnection/db');

const userRouter = require('./routes/userRoute')
const organizationRouter = require('./routes/organizationRoute')
const branchRouter = require('./routes/branchRoute')
const hallRouter = require('./routes/hallRoute')
const seatRouter = require('./routes/seatRoute')
const movieRouter = require('./routes/movieRoute')
const ticketRouter = require('./routes/ticketRoute')

// const authRoutes = require('./routes/authRoutes');
// const checkRole = require('./middleware/checkRole');


const app = express();

app.use(express.json())
// app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));


app.use(bodyParser.json());
app.use(cors())
app.use((req, res, next) => {
    // console.log(req.method, req.path)
    next()
})

// app.use('/api/auth', authRoutes);

app.use("/api/users", userRouter)
app.use("/api/organizations", organizationRouter)
app.use("/api/branches", branchRouter)
app.use("/api/halls", hallRouter)
app.use("/api/seats", seatRouter)
app.use("/api/movies", movieRouter)
app.use("/api/tickets", ticketRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})