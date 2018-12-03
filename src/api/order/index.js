import express from 'express'
import {addOrder, getOrder} from '../../lib/food'

// se crea el nuevo router para almacenar rutas
const router = express.Router()

/*
 * Este endpoint crea un nuevo registro
 */
router.post('/', (req, res) => {
    // se valida que venga una cabecera custom
    if (_g.auth.checkUnsecuredRoute(req, res)) {
        console.log(req.body, " the req")
        let body = {
            total: req.body.total ? req.body.total : null,
            orders: req.body.orders ? req.body.orders : null,
            waitressName: req.body.waitressName ? _g.validator.escape(_g.validator.trim(req.body.waitressName)) : null
        }

        let areFieldsRight = body.total && body.orders && body.waitressName
        // validamos los fields requeridos
        if (areFieldsRight) {
            addOrder(body)
                .then((response) => {
                    res.json({
                        order: response
                    })
                }).catch((e) => {
                res.status(_g.constants.ERROR_CODES.HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
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
router.get('/:id', (req, res) => {
    if (_g.auth.checkUnsecuredRoute(req, res)) {
        getOrder(req.param.id)
            .then((response) => {
                res.json({
                        order: response
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
