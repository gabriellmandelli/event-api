const Group = require("../models/Group");

module.exports = {

  async addGroup(request, response) {

    const { name, description, date, contacts, startTime } = request.body;

    await Group.create({
      name: name,
      description: description,
      date: date,
      contacts: contacts,
      startTime: startTime
    }, (error, result) => {
      if (error) {
        return response.json(error);
      }
      return response.json(result);
    });
  },

  async updateGroup(request, response) {
    const { id, name, description, date, contacts, startTime } = request.body;

    const contactId = request.params.id

    let updateGroup = await Group.findById(id, (error) => {
      if (error) {
        return response.json(error);
      }
    });

    const contactUpdate = contacts.find(contact => contact.contact === contactId)

    if (contactUpdate.permission === 1) {
      updateGroup.name = name;
      updateGroup.description = description;
      updateGroup.date = date;
      updateGroup.startTime = startTime;
    }

    updateGroup.contacts.forEach((contact) => {
      if (contact.contact.toString() === contactUpdate.contact.toString()) {
        contact.participate = contactUpdate.participate
        contact.permission = contactUpdate.permission
      } else {
        if (contactUpdate.permission === 1) {
          let contactToUpdate = contacts.find(contactUpdate => contactUpdate.contact.toString() === contact.contact.toString())
          contact.permission = contactToUpdate.permission
        }
      }
    })

    await updateGroup.save((error) => {
      if (error) {
        return response.json(error);
      }
    });

    return response.json(updateGroup);
  },

  async findGroupById(request, response) {
    await Group.findById(request.params.id, (error, result) => {
      if (error) {
        return response.json(error);
      }
      return response.json(result.data);
    });
  },

  async findGroupAll(request, response) {
    await Group.find((error, result) => {
      if (error) {
        return response.json(error);
      }
      return response.json(result);
    });
  },

  async deleteGroupById(request, response) {
    await Group.deleteOne({ _id: request.params.id }, (error, result) => {
      if (error) {
        return response.json(error);
      }
      return response.json(result);
    });
  },

  async deleteGroupAll(request, response) {
    await Group.deleteMany((error, result) => {
      if (error) {
        return response.json(error);
      }
      return response.json(result);
    });
  }
};