import http from 'http'
import express from 'express'
import cors from 'cors'
import Sequelize from 'sequelize'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import globals from './common/globals'
import api from './api'

// se inicia express para controlar las rutas y archivos estaticos
const app = express()
// se crea el servidor con configuraciones basicas de express
const server = http.createServer(app)
// se define el puerto que se utilizará para escuchar las peticiones
const port = process.env.PORT || _g.configDatabase.port

const sequelize = new Sequelize( process.env.POSTGRESS_URI || _g.configDatabase.database, {
  host: 'localhost',
  dialect: 'postgres',
  define: {
   underscored: true,
   freezeTableName: false,
   charset: 'utf8',
   dialectOptions: {
     collate: 'utf8_general_ci'
   },
   timestamps: true
 },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
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
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
