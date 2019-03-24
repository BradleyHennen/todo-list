const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('server/public'));

const todoRouter = require('./modules/todo.router');
app.use(todoRouter);

const PORT = process.PORT || 5000;

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
}); 

