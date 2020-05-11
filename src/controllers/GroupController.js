const Group = require("../models/Group")
const ModelConstants = require("../configurations/constants/GroupConstants")

module.exports = {

  async addGroup(request, response) {

    const { name, description, date, contacts, location, startTime } = request.body

    await Group.create({
      name: name,
      description: description,
      date: date,
      startTime: startTime,
      contacts: contacts,
      location: location
    }, (error, result) => {
      if (error) {
        return response.json(error)
      }
      return response.json(result)
    })
  },

  async updateGroup(request, response) {

    const { id, name, description, date, contacts, location, startTime } = request.body

    const contactId = request.query.contactId

    let updateGroup = await Group.findById(id, (error) => {
      if (error) {
        return response.json(error)
      }
    })

    const contactUpdate = contacts.find(contact => contact.contact === contactId)

    if (contactUpdate.permission === ModelConstants.PERMISSION_GROUP_ADMINISTRATOR) {
      updateGroup.name = name
      updateGroup.description = description
      updateGroup.date = date
      updateGroup.startTime = startTime
      updateGroup.location = location
    }

    updateGroup.contacts.forEach((contact) => {
      if (contact.contact.toString() === contactUpdate.contact.toString()) {
        contact.participate = contactUpdate.participate
        contact.permission = contactUpdate.permission
      } else {
        if (contactUpdate.permission === ModelConstants.PERMISSION_GROUP_ADMINISTRATOR) {
          let contactToUpdate = contacts.find(contactUpdate => contactUpdate.contact.toString() === contact.contact.toString())
          contact.permission = contactToUpdate.permission
        }
      }
    })

    await updateGroup.save((error) => {
      if (error) {
        return response.json(error)
      }
    })

    return response.json(updateGroup)
  },

  async findGroupById(request, response) {
    await Group.findById(request.params.id, (error, result) => {
      if (error) {
        return response.json(error)
      }
      return response.json(result.data)
    })
  },

  async findGroupAll(request, response) {
    await Group.find((error, result) => {
      if (error) {
        return response.json(error)
      }
      return response.json(result)
    })
  },

  async deleteGroupById(request, response) {
    await Group.deleteOne({ _id: request.params.id }, (error, result) => {
      if (error) {
        return response.json(error)
      }
      return response.json(result)
    })
  },

  async deleteGroupAll(request, response) {
    await Group.deleteMany((error, result) => {
      if (error) {
        return response.json(error)
      }
      return response.json(result)
    })
  }
}