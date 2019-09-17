const Contact = require('../models/Contact');

module.exports = {

  async addContact(request, response) {

    const { name, phoneNumber } = request.body;

    const resultContact = await Contact.findOne({ phoneNumber: phoneNumber }, (error) => {
      if (error) {
        return response.json(error);
      }
    });

    if (resultContact) {
      return response.json({ message: 'O numero do contato informado já esta sendo utilizado.' });
    } else {
      await Contact.create({
        name,
        phoneNumber
      }, (error, result) => {
        if (error) {
          return response.json(error);
        }
        return response.json(result);
      });
    }
  },

  async updateContact(request, response) {
    const { id, name, phoneNumber } = request.body;

    let updateContact = await Contact.findById(id, (error) => {
      if (error) {
        return response.json(error);
      }
    });

    updateContact.name = name;
    updateContact.phoneNumber = phoneNumber;

    console.log(updateContact)

    await updateContact.save((error) => {
      if (error) {
        return response.json(error);
      }
    });

    return response.json(updateContact);
  },

  async findContactAll(request, response) {
    await Contact.find((error, result) => {
      if (error) {
        return response.json(error);
      }
      return response.json(result);
    });
  },

  async findByContactPhoneNumber(request, response) {
    const { phoneNumber } = request.query.phoneNumber;

    await Contact.findOne({ phoneNumber: phoneNumber }, (error, result) => {
      if (error) {
        return response.json(error);
      }
      return response.json(result);
    });
  },

  async findContactByListPhoneNumber(request, response) {

    let paramsPhoneNumber = [];

    let queryParams = request.query.phoneNumber.split(',');

    if (request.query.phoneNumber) {
      if (request.query.phoneNumber.toString().includes(',')) {
        for (let phoneNumber in queryParams) {
          paramsPhoneNumber.push(queryParams[phoneNumber]);
        }
      } else {
        paramsPhoneNumber.push(request.query.phoneNumber);
      }
    }

    Contact.find({ phoneNumber: { $in: paramsPhoneNumber } }, (error, grupo) => {
      if (error) {
        return response.send(error);
      }
      return response.json(grupo);
    });
  },

  async deleteContactById(request, response) {
    await Contact.deleteOne({ _id: request.params.id }, (error, result) => {
      if (error) {
        return response.json(error);
      }
      return response.json(result);
    });
  },

  async deleteContactAll(request, response) {
    await Contact.deleteMany((error, result) => {
      if (error) {
        return response.json(error);
      }
      return response.json(result);
    });
  }
};