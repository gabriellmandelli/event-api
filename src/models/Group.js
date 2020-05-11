const { Schema, model } = require("mongoose")

const ProductSchema = new Schema({

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },

  date: {
    type: String,
    required: true,
  },

  startTime: {
    type: String,
    required: true,
  },

  contacts: [{
    contact: {
      type: Schema.Types.ObjectId,
      ref: 'Contact'
    },

    participate: {
      type: Boolean,
    },

    permission: {
      type: Number,
    }
  }],
  
  location: {

    address: {
      type: String,
    },

    longitude: {
      type: Number,
    },

    latitude: {
      type: Number,
    }
  }
}, {
  timestamps: true,
})

ProductSchema.set('toObject', { virtuals: true })
ProductSchema.set('toJSON', { virtuals: true })
ProductSchema.virtual('id').get(function () {
  return this._id
})

module.exports = model('Group', ProductSchema)