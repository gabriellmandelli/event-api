
const MONGOOSE_USER = "zaccaron1"
const MONGOOSE_PASSWORD = "amyO6TGuT1It5ntp"
const MONGOOSE_DATABASE = "eventapi"
const MONGOOSE_CONNECTION_PROD = `mongodb+srv://${MONGOOSE_USER}:${MONGOOSE_PASSWORD}@clusterevent-sbmbf.mongodb.net/${MONGOOSE_DATABASE}?retryWrites=true&w=majority`
const MONGOOSE_CONNECTION_DEV = `mongodb://${MONGOOSE_USER}:${MONGOOSE_PASSWORD}@clusterevent-shard-00-00-sbmbf.mongodb.net:27017,clusterevent-shard-00-01-sbmbf.mongodb.net:27017,clusterevent-shard-00-02-sbmbf.mongodb.net:27017/${MONGOOSE_DATABASE}?ssl=true&replicaSet=ClusterEvent-shard-0&authSource=admin&retryWrites=true&w=majority`

module.exports = {
  MONGOOSE_CONNECTION : MONGOOSE_CONNECTION_PROD,
  SERVER_PORT : process.env.PORT || 3333
}
