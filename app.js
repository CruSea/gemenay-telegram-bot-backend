const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./app/models');

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors());

db.sequelize.sync({
    force: false
}).then(() => {
    console.log('sync database');
})

require('./app/routes/issue.route')(app);
require('./app/routes/comment.route')(app);
require('./app/routes/category.route')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})