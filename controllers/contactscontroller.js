const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { constants } = require("../constants");
const mongoose = require("mongoose");

const getcontacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
};

const getcontact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.statusCode = constants.NOT_FOUND;
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    res.statusCode = constants.NOT_FOUND;
    throw new Error("Contact not found");
  }
});
const addcontact = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    res.status(400);
    throw new Error("Name and phone are required!");
  }
  const newContact = await Contact.create({
    name,
    phone,
  });
  res.status(201).json(newContact);
});

const updatecontact = asyncHandler(async (req, res) => {
    const { name, phone } = req.body;
    if (!name || !phone) {
      res.status(400);
      throw new Error("Name and phone are required!");
    }
  try {    
    const contact = await Contact.fidById(req.params.id);
    if (!contact) {
      console.log(`Contact with id ${req.params.id} not found`);
      res.status(constants.NOT_FOUND);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(constants.NOT_FOUND);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  console.log(`Contact ${id} updated successfully`);
  // Respond with the updated contact
  res.status(201).json(updatedContact);
});
const deletecontact = asyncHandler(async (req, res) => {
    let contact;

    try {
         contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      res.status(constants.NOT_FOUND);
      throw new Error("Contact nott found");
    }
    } catch (error) {
      res.status(constants.NOT_FOUND);
      throw new Error("Contact not found");
    }
    
    console.log(`Contact ${req.params.id} deleted successfully`);
  res.status(201).send(
  "Below Contact deleted successfully:\n" +
  JSON.stringify(contact, null, 2)
);
});

module.exports = {
  getcontacts,
  getcontact,
  updatecontact,
  addcontact,
  deletecontact,
};
