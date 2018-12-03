import express from 'express'
import user from './user'
import table from './table'
import food from './food'
import order from './order'

// se crea el nuevo router para almacenar rutas
const router = express.Router()

// se valida que el usuario esté loguaedo, si no se responde con 401
router.use((req, res, next) => {
    next()
})

router.use('/users', user)
router.use('/tables', table)
router.use('/food', food)
router.use('/orders', order)


// se exporta el nuevo router
export default router
