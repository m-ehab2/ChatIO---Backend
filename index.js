const express = require('express')
const app = express();
const connectToDatabase = require('./config/Database');
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const authRoute = require('./routes/auth');
const messageRoute = require('./routes/message');
const ErrorHandler = require('./middlewares/ErrorHandler');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const cors = require('cors');
const NotFound = require('./errors/NotFound');
const endPointStartWith='/api/v1'
app.use(express.json())
app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:5173',
            'http://127.0.0.1:5173'
        ],
    })
);
const port = process.env.PORT || 3000;
const urlDataBase = process.env.DATABASE_URL;
app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());
app.use(`${endPointStartWith}/auth`, authRoute);
app.use(`${endPointStartWith}/user`, userRoute);
app.use(`${endPointStartWith}/chat`, chatRoute);
app.use(`${endPointStartWith}/message`, messageRoute);


app.all('*', (req, res, next) => {
    next(new NotFound(`Cant find ${req.originalUrl} on this server`, 404))
})
app.use(ErrorHandler)


connectToDatabase(urlDataBase)
app.listen(port, () => {
    console.log("localhost:", port)
})