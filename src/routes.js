const express = require("express");

const GroupController = require("./controllers/GroupController");
const ContactController = require("./controllers/ContactController");
const ContactGroupController = require("./controllers/ContactGroupController");

const groupRoutes = express.Router();
const contactRoutes = express.Router();
const contactGroupsRoutes = express.Router();

groupRoutes
  .post('/group', GroupController.addGroup)
  .put('/group', GroupController.updateGroup)
  .get('/group', GroupController.findGroupAll)
  .get('/group/:id', GroupController.findGroupById)
  .delete('/group', GroupController.deleteGroupAll)
  .delete('/group/:id', GroupController.deleteGroupById)

contactRoutes
  .post('/contact', ContactController.addContact)
  .put('/contact', ContactController.updateContact)
  .get('/contact', ContactController.findContactAll)
  .get('/contact/number', ContactController.findByContactPhoneNumber)
  .get('/contact/numbers', ContactController.findContactByListPhoneNumber)

contactGroupsRoutes
  .get('/contact/:id/group', ContactGroupController.findContactGroups)
  .post('/group/:id/contact', ContactGroupController.addContactToGroup)

module.exports = [groupRoutes, contactRoutes, contactGroupsRoutes];