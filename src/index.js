import http from 'http'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import api from 'src/api'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import globals from 'src/common/globals'
import { Promise } from 'bluebird'

// se inicia express para controlar las rutas y archivos estaticos
const app = express()
// se crea el servidor con configuraciones basicas de express
const server = http.createServer(app)
// se define el puerto que se utilizará para escuchar las peticiones
const port = process.env.PORT || _g.configDatabase.port

// se conecta a la base de datos MONGODB donde se almacenaran los datos
mongoose.connect(process.env.MONGOLAB_URI || _g.configDatabase.database)
// set Promise provider to bluebird
mongoose.Promise = Promise;

mongoose.connection.on('open', () => {
    console.log('Mongo is connected')

// HTTP request logger middleware
app.use(morgan('dev'))
// La api va a recibir peticiones desde otros dominios, se habilitan los cors
app.use(cors())
// se indica que no solo acepte codificación UTF-8
app.use(bodyParser.urlencoded({ extended: true }))
// se convierten los datos que vienen en la peticion a formato json
app.use(bodyParser.json())
// se crea el middleware que contendrá todos los endpoints de la api
app.use('/api', api)

server.listen(port, () => console.log(`Server listening on port ${port}`))
})
