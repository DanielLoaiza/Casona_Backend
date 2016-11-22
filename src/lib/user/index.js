import {default as User} from 'src/models/User'
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
    newUser.password = _g.utils.shaEncrypt(newUser.salt + newUser.password)
    newUser.email = userData['email']
      return newUser.save()
  }).then((newUser) => {
        console.log("then new", newUser)
    // registrado!, se crea el token
    var token = jwt.encode(newUser, _g.configDatabase.secret)

    delete newUser.password
    delete newUser.salt
        return Promise.resolve({success: true, user: newUser, token: token})
  }).catch((e) => {
       return Promise.reject(e)
  })
}
