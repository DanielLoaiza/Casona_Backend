import jwt from 'jwt-simple'

// middleware que valida si esta llegando un header custom, esto se usa en rutas que no necesitan auth
export function checkUnsecuredRoute(req, res) {
	let success = false
	if (req && req.headers && req.headers._authorization && req.headers._authorization === _g.constants.HEADER_FOR_NO_AUTH_ROUTES) {
		success = true
	} else {
		res.json('unauthorized')
	}

	return success
}

// función que basado en el JWT Token, retorna la info del usuario logueado
export function getLoggedUserData(req, res) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    var token = req.headers.authorization.split(' ')[1]
    var data = jwt.decode(token, _g.configDatabase.secret)

    // se valida si la info se obtuvo correctamente
    if (data._id) {
    	return data
    } else {
    	// error decodificando el token
	    return res.status(500).json({
	      message: {
	        code: _g.constants.ERROR_CODES.MESSAGES.INTERNAL_ERROR,
	        desc: 'Error trying to decode token :/'
	      }
	    })
    }
  } else {
    // error decodificando el token
    return res.status(500).json({
      message: {
        code: _g.constants.ERROR_CODES.MESSAGES.INTERNAL_ERROR,
        desc: 'Error trying to decode token :('
      }
    })
  }
}
