const Contact = require('../models/Contact');

module.exports = {

  async add(request, response) {

    const { name, numberPhone } = request.body;

    const resultContact = await Contact.findOne({ numberPhone: numberPhone }, (error) => {
      if (error) {
        return response.json(error)
      }
    });

    if (resultContact) {
      return response.json({ menssage: 'O numero do contato informado já esta sendo utilizado.' });
    } else {
      await Contact.create({
        name,
        numberPhone
      }, (error, result) => {
        if (error) {
          return response.json(error)
        }
        return response.json(result)
      });
    }
  },

  async findAll(request, response) {
    await Contact.find((error, result) => {
      if (error) {
        return response.json(error)
      }
      return response.json(result)
    });
  },

  async findByContactNumberPhone(request, response) {
    const { numberPhone } = request.headers;

    await Contact.findOne({ numberPhone: numberPhone }, (error, result) => {
      if (error) {
        return response.json(error)
      }
      return response.json(result)
    });
  }
};