
const authAdmin = require('firebase-admin')

const envProd = require('../environments/process.env.prod')

authAdmin.initializeApp({
  credential: authAdmin.credential.cert(envProd.serviceAccount),
  databaseURL: "https://eventproject-93179.firebaseio.com"
})

async function authVerifyIdToken(request, response, next){

  const { authorization } = request.headers
  
  authAdmin.auth().verifyIdToken(authorization)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
  }).catch(function(error) {
    response.json({status: 401})
  });
  
  next()
}

module.exports = authVerifyIdToken
