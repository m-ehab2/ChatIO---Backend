const express=require('express')
const app = express();
const connectToDatabase = require('./config/Database');
const AppError=require('./utils/AppError')
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const ErrorHandler = require('./middleware/ErrorHandler');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const cors = require('cors');


app.use(express.json())
app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:3000',
        ],
    })
    );
    const port = process.env.PORT || 3000;
    const urlDataBase = process.env.DATABASE_URL;
    app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 404))
})
app.use(ErrorHandler)


connectToDatabase(urlDataBase)
app.listen(port, () => {
    console.log("localhost:",port)
})