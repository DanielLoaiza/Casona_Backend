/**
* Utilidades de la aplicación
*/
import sha512 from 'sha512'

/**
* Función responsable de obtener un parámetro y devolver su valor numérico, en
* caso de que la entrada no corresponda a un número retorna un valor por
* defecto que tambien llega como parámetro
*/
export function getParsedInt (value, defaultValue = 0) {
  let response = defaultValue

  if (!_g._.isUndefined(value)) {
    let valueParsed = parseInt(value, 10)

    if (_g._.isInteger(valueParsed)) {
      response = valueParsed
    }
  }

  return response
}

/*
 * Esta función permite encriptar en sha512
 */
export function shaEncryp(msg) {
  // se encripta el mensaje
  let hash = sha512(msg)
  // se convierte a hexadecimal y se retorna
  return hash.toString('hex')
}

let availableLangs = ['en', 'es']
/**
* Función que valida que un lenguaje sea válido para la app
*/
export function validateLang(lang) {
  let langResponse = ''
  // lang por defecto
  let langDefault = 'en'

  if (lang) {
    for (let i = 0; i < availableLangs.length && langResponse === ''; i++) {
      if (lang == availableLangs[i]) {
        // lang valido
        langResponse = lang
      }
    }
  }

  // el email de entrada no es válido, se deja el por defecto
  if (langResponse === '') {
    langResponse = langDefault
  }

  return langResponse
}


let alphabetLowercase = 'abcdefghijklmnopqrstuvwxyz'
let alphabetUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let numbers = '0123456789'
let symbols = '~`!@#$%^&*()_+-={}[]:"\'<>?,./|\\'

// función responsable de obtener un string alphanumeric ramdom de [length] caracteres
export function randomString(length, chars) {
  var result = ''
  var mask = ''

  if (chars.indexOf('a') > -1) mask += alphabetLowercase
  if (chars.indexOf('A') > -1) mask += alphabetUppercase
  if (chars.indexOf('#') > -1) mask += numbers
  if (chars.indexOf('!') > -1) mask += symbols
  if (chars.indexOf('#aA') > -1) mask += alphabetLowercase + alphabetUppercase + numbers

  for (var i = length; i > 0; --i) {
    result += mask[Math.floor(Math.random() * mask.length)]
  }

  return result
}
