const express = require('express')
const compression = require('compression');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(compression()); // Compresses res body (gzip, etc.)
// for using static files on vercel(in this case styles)
app.use(express.static(path.join(__dirname, 'public')));
// u add router here
app.use('/', itemRoutes)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});
// choose a port
const PORT = 3001;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`my app - listening on port ${PORT}!`);
});
module.exports = app;
