import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import httpLogger from '@middlewares/http-logger';
import Exception from '@helpers/exception';
import { messages } from '@helpers/constants';

import routeModules from './routes';

const app = express();
const { NOT_FOUND } = messages;

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

// register modules
routeModules(app);

// catch 404 and forward to exception handler
app.use((req, res, next) => next(createError(404, NOT_FOUND)));

// exception handlers
app.use(Exception.handleDatabaseError());
app.use(Exception.handleDatabaseUniqueError());
app.use(Exception.handleError());

export default app;
