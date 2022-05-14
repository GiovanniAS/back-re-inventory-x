
const bodyparser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()

//configuracion de rutas
const authRoutes = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard')
const verifytoken = require('./routes/validate-token')
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}
//servidor
const app = express()

//conexion
const uri = `mongodb+srv://${process.env.USERNAMEM}:${process.env.PASSWORD}@cluster0.zpjsu.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const PUERTO = process.env.PORT || 3005

mongoose.connect(uri, options)
  .then(() => console.log('Conexion exitosa'))
  .catch(e => console.log('Error DB: ' + e))

/* mongoose.connect(uri, options).then(
    () =>{
        console.log('conectado a DB')
    },
    err =>{ err }
) */

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(morgan('tiny'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Rutas del Back
app.get('/', (req, res) =>{

    res.json({
      estado: true,
      mensaje: 'Funcionando!!!'
    })
  })

app.use('/api/user', authRoutes)
app.use('/api/dashboard', verifytoken, dashboardRoutes)
app.use('/apiProducto', require('./routes/producto'))

// Middleware para Vue router mode history
const history = require('connect-history-api-fallback')
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))


//app.set('puerto', process.env.PORT)

app.listen(PUERTO, () =>{
    console.log(`Servidor Trabajando en el puerto: ${PUERTO}`)
  })