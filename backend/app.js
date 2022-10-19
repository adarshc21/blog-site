const express = require('express');
const app = express();
const error = require('./middleware/error');
const cookieParser = require('cookie-parser');

// middleware
app.use(express.json());
app.use(cookieParser());

// import available routes
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/', userRoutes);

app.use(error);

module.exports = app;