import express from 'express'
import {addUser} from 'src/lib/user'

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
            lastname: req.body.lastname ? _g.validator.escape(_g.validator.trim(req.body.lastname)) : null,
            email: req.body.email && _g.validator.isEmail(req.body.email) ? _g.validator.escape(_g.validator.trim(req.body.email)) : null,
            password: req.body.password ? _g.validator.escape(_g.validator.trim(req.body.password)) : null
        }

        let areFieldsRight = body.name && body.lastname && body.email && body.password

        // validamos los fields requeridos
        if (areFieldsRight) {
            addUser(body)
                .then((response) => {
                    res.json({
                        success: true,
                        data: {
                            token: response.token,
                            user: response.user
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

// se exporta el nuevo router
export default router
