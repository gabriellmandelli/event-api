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