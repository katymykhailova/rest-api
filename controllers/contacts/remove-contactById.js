const { sendSuccessRes } = require('../../helpers');
const contactsOperations = require('../../model/contacts');
const { NotFound } = require('http-errors');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessRes(res, { message: 'Success delete' });
};

module.exports = removeContact;
