import {default as User} from '../../models/User'
import uniqid from 'uniqid'
import jwt from 'jwt-simple'


export function addUser(userData) {
  return User.findOne({email : userData.email}).exec()
      .then((user) => {
    let newUser = {}
        // Si se encuentra usuario se actualizan los campos
    if(user) {
      newUser = user;
    } else {
      newUser = new User()
    }
    newUser.name = userData['name']
    newUser.lastName = userData['lastname']
    newUser.salt = uniqid()
    newUser.password = _g.utils.shaEncrypt(newUser.salt + userData.password)
    newUser.email = userData['email']
      return newUser.save()
  }).then((newUser) => {
    // registrado!, se crea el token
    var token = jwt.encode(newUser, _g.configDatabase.secret)

    delete newUser.password
    delete newUser.salt
        return Promise.resolve({success: true, user: newUser, token: token})
  }).catch((e) => {
       return Promise.reject(e)
  })
}

export function authUser(userData) {
  return User.findOne({email : userData.email}).exec()
      .then((user) => {
        // se encontró el usuario
        if(user) {
          let password = _g.utils.shaEncrypt(user.salt + userData.password)
          if(password == user.password) {
            delete user.password
            delete user.salt
            var token = jwt.encode(user, _g.configDatabase.secret)
            return Promise.resolve({success: true, user: user, token: token})
          } else {
            return Promise.reject({status:_g.constants.ERROR_CODES.HTTP_STATUS.UNAUTHORIZED})
          }

        } else {
          return Promise.reject({status:_g.constants.ERROR_CODES.HTTP_STATUS.NOT_FOUND})
        }
      })
      .catch((e) => {
        return Promise.reject(e)
      })
}
