const { Schema, model } = require("mongoose");

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
    type: Date,
    required: true,
  },

  startTime: {
    type: String,
    required: true,
  },

  contacts: [{
    contactId: {
      type: Schema.Types.ObjectId,
      ref: 'Contact',
    },

    participate: {
      type: Boolean,
    },

    permission: {
      type: Number,
    }
  }],
}, {
  timestamps: true,
});

ProductSchema.set('toObject', { virtuals: true })
ProductSchema.set('toJSON', { virtuals: true })
ProductSchema.virtual('id').get(function () {
  return this._id
})

module.exports = model('Group', ProductSchema);