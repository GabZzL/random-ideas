const express = require('express');
const connectDB = require('./config/db.js')
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// connect to the database
connectDB();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// home route
app.get('/', (req, res) => {
    res.send({ result: 'welcome to ideas API'});
});

// ideas routes
const ideasRouter = require('./routes/ideas.js');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});