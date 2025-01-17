const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db.js')

const app = express();
const port = process.env.PORT;

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// connect to the database
connectDB();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// cors middleware
if (process.env.NODE_ENV !== "production") {
    const cors = require("cors");
      app.use(
        cors({
          origin: ["http://localhost:5000", "http://localhost:3000"],
          credentials: true,
        })
    );
};

// home route
app.get('/', (req, res) => {
    res.send({ result: 'welcome to ideas API'});
});

// ideas routes
const ideasRouter = require('./routes/ideas.js');
app.use('/api/ideas', ideasRouter);

// start the server
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});