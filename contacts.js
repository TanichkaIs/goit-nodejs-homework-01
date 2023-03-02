const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function updateContact(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find(
    (contact) => contact.id === `${contactId}`
  );
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex((contact) => contact.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = allContacts.splice(idx, 1);
  updateContact(allContacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  updateContact(allContacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};