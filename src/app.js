require("dotenv").config();
const http        = require('http');
const express     = require('express')
const bodyParser  = require('body-parser')
const morgan      = require('morgan')
const cors        = require('cors')
const app         = module.exports = express()
const server      = http.createServer(app)
const port        = parseInt(process.env.PORT || 3000);
const db          = require('./models');
const route       = require('./routes/index');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors({origin: true}))
app.use('/api',route)
app.use(notFound);

app.use(errorHandler);
// Test the database connection and sync the models
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
        // return db.sequelize.sync();
    })
    .then(() => {
        server.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


function notFound(req, res, next) {
  res.status(404)
    .send({error: 'Url not found', status: 404, url: req.url})
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  res.status(500)
    .send({error: err, url: req.url, status: 500})
}