
const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(process.env.serviceAccount),
  databaseURL: "https://eventproject-93179.firebaseio.com"
})

async function authVerifyIdToken(request, response, next){

  const { authorization } = request.headers
  
  admin.auth().verifyIdToken(authorization)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
  }).catch(function(error) {
    console.log(error)
    response.json({status: 401})
  });
  
  next()
}

module.exports = authVerifyIdToken
