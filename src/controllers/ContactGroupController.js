const Contact = require('../models/Contact');
const Group = require('../models/Group');

module.exports = {

  async findContactGroups(request, response) {

    const idContact = request.params.id;

    await Group.find({ "contacts.contactId": idContact })
      .populate('contacts.contactId')
      .exec((error, result) => {
        if (error) {
          return response.json(error)
        } else {
          return response.json(result)
        }
      });
  },

  async addContactToGroup(request, response) {

    const { contactId, participate, permission } = request.body;

    const groupToAdd = await Group.findById(request.params.id, (error) => {
      if (error) {
        return response.json(error);
      }
    });

    const validContact = await Contact.findById(contactId, (error) => {
      if (error) {
        return response.json(error);
      }
    });

    if (validContact) {
      groupToAdd.contacts.push({ contactId, participate, permission });

      await groupToAdd.save((error) => {
        if (error) {
          return response.json(error);
        }
      });
      return response.json(groupToAdd)
    } else {
      return response.json({ message: "Contato não existe" })
    }
  },
}