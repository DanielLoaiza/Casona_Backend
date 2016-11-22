import express from 'express'
import user from 'src/api/user'

// se crea el nuevo router para almacenar rutas
const router = express.Router()

// se valida que el usuario esté loguaedo, si no se responde con 401
router.use((req, res, next) => {
    next()
})

router.use('/users', user)


// se exporta el nuevo router
export default router
