const { Schema, model } = require("mongoose")

const ContactSchema = new Schema({

  name: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true
  },

}, {
  timestamps: true,
})

ContactSchema.set('toObject', { virtuals: true })
ContactSchema.set('toJSON', { virtuals: true })
ContactSchema.virtual('id').get(function () {
  return this._id
})

module.exports = model('Contact', ContactSchema)