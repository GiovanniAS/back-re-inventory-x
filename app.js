import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';


const app = express()
const uri = 'mongodb://localhost:27017/reInventory'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useCreateIndex: true
}

mongoose.connect(uri, options).then(
    () =>{
        console.log('conectado a DB')
    },
    err =>{ err }
)

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Rutas del Back
app.get('/', (req, res) => {
    res.send('Hola Mundo!!!')
})

app.use('/apiProducto', require('./routes/producto'))

// Middleware para Vue router mode history
const history = require('connect-history-api-fallback')
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))


app.set('puerto', process.env.PORT || 3005)

app.listen(app.get('puerto'), () =>{
    console.log('Ejemplo del servidor Puerto'+ app.get('puerto'))
})