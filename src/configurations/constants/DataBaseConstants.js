
const MONGOOSE_USER = "zaccaron1"
const MONGOOSE_PASSWORD = "amyO6TGuT1It5ntp"
const MONGOOSE_DATABASE = "eventapi"

module.exports = {
  MONGOOSE_CONNECTION : `mongodb+srv://${MONGOOSE_USER}:${MONGOOSE_PASSWORD}@clusterevent-sbmbf.mongodb.net/${MONGOOSE_DATABASE}?retryWrites=true&w=majority`,
  SERVER_PORT : process.env.PORT || 3333
}