const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandlerRouter = require('./routes/errorHandler.routes');
const apiRouter = require('./routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT;


// ! RUTAS
apiRouter(app);
// ! ROUTE ERROR
errorHandlerRouter(app);


app.listen(PORT, () => {
    console.log(`ESCUCHANDO POR EL PUERTO ${PORT}`);
})



