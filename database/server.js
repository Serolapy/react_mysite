import express from 'express';
import 'colors';
import cors from 'cors';
import constants from '../src/const.json' assert { type: "json" };
import cookieParser from 'cookie-parser';

import { dbConnect } from './db.js';
import usersRouter from './routes/users.js';
//import blogsRouter from './routes/blogs.js';

var app = express();
app.use(express.json());
app.use(cookieParser());	//куки
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
app.use(usersRouter);
//app.use(blogsRouter);



app.listen(constants.DATABASE_SERVER_PORT, function(){
	console.log(`Server started on port ${constants.DATABASE_SERVER_PORT}`.green);
	dbConnect();
});