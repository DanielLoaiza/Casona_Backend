import express from 'express'
import {addFood, getFood} from 'src/lib/food'

// se crea el nuevo router para almacenar rutas
const router = express.Router()

/*
 * Este endpoint crea un nuevo registro
 */
router.post('/', (req, res) => {
    // se valida que venga una cabecera custom
    if (_g.auth.checkUnsecuredRoute(req, res)) {
        let body = {
            name: req.body.name ? _g.validator.escape(_g.validator.trim(req.body.name)) : null,
            price: req.body.price ? _g.validator.escape(_g.validator.trim(req.body.price)) : null,
            description: req.body.description ? _g.validator.escape(_g.validator.trim(req.body.description)) : null
        }
        
        let areFieldsRight = body.name && body.price && body.description
        // validamos los fields requeridos
        if (areFieldsRight) {
            addFood(body)
                .then((response) => {
                    res.json({
                        success: true,
                        data: {
                            food: response
                        }
                    })
                }).catch((e) => {
                res.status(_g.constants.ERROR_CODES.HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
                    success: false,
                    error: e
                })
            })
        } else {
            res.json(_g.constants.RESPONSES.MISSING_FIELDS_OR_WRONG_INPUTS)
        }
    }
})

/*
 * this endpoint return all the tables
 */
router.get('/', (req, res) => {
    if (_g.auth.checkUnsecuredRoute(req, res)) {
        getFood()
            .then((response) => {
                res.json({
                    data: {
                        tables: response
                    }
                })
            }).catch((e) => {
            res.status(_g.constants.ERROR_CODES.HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
                success: false,
                error: e
            })
        })
    } else {
        res.json(_g.constants.ERROR_CODES.HTTP_STATUS.UNAUTHORIZED)
    }
})

// se exporta el nuevo router
export default router
