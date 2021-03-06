import configDatabase from '../config/database'
import {checkUnsecuredRoute, getLoggedUserData} from './auth'
import {HEADER_FOR_NO_AUTH_ROUTES,GENERAL,RESPONSES, ERROR_CODES} from './constants'
import {validateLang, getParsedInt, shaEncryp, randomString, formatString} from './utilities'
import validator from 'validator'


// componente donde se indican los componentes / vars globales para la app
global._g = {
	configDatabase: configDatabase,
	auth: {
		checkUnsecuredRoute: checkUnsecuredRoute,
		getLoggedUserData: getLoggedUserData
	},
	constants: {
		HEADER_FOR_NO_AUTH_ROUTES: HEADER_FOR_NO_AUTH_ROUTES,
		GENERAL: GENERAL,
		RESPONSES: RESPONSES,
		ERROR_CODES: ERROR_CODES
	},
	utils: {
		getParsedInt: getParsedInt,
		shaEncrypt: shaEncryp,
		validateLang: validateLang,
		randomString: randomString,
		formatString: formatString
	},
	validator: validator
}
