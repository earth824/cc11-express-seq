require('dotenv').config();
require('./config/passport');

const express = require('express');
const cors = require('cors');

const todoRoute = require('./routes/todoRoute');
const userRoute = require('./routes/userRoute');
const notFoundMiddleware = require('./middlewares/notfound');
const errorMiddleware = require('./middlewares/error');
const authenticate = require('./middlewares/authenticate');
const passportJwt = require('./middlewares/passportJwt');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// REST API: handle resource Todos
// CREATE, UPDATE, DELETE, GETALL, GETBYID
app.use('/todos', passportJwt, todoRoute);

// REST API: handle resource Users
// CREATE, UPDATE
app.use('/users', userRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port: ${port}`));
