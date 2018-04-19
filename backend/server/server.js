const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const app = express();

/**function to communicate to database
 * here we are communicating with cloud mongoDB database
*/
mongoose.connect(config.database, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to cloud MongoDB database');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

//we need to import any roues on serever.js (here) to use it
const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const postRoutes = require('./routes/post');
const courseSearchRoutes = require('./routes/course-search');
const saleSearchRoutes = require('./routes/sale-search');


app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/search', courseSearchRoutes);
app.use('/api/search', saleSearchRoutes);


/** cors is the middleware to prevent error if frontend and backend
    * are in different domain and port. Also, it is good for communicating
    * between frontend and backend smoothly
 **/
app.use(cors());

app.listen(config.port, function(err) {
    console.log('Running on port ' + config.port);
});
