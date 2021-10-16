const { NotFound, Forbidden } = require('http-errors');
const { User } = require('../../models');
const { sendEmail, sendSuccessRes } = require('../../helpers');

const reSend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing required field email',
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound('User not found');
  }

  if (user.verify) {
    throw new Forbidden('User already verified');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify your email to finish registration',
    html: `<a href="http://localhost:8080/api/auth/verify/${user.verifyToken}" target="_blank">Confirm email<a>`,
  };

  await sendEmail(verifyEmail);

  sendSuccessRes(res, null, 201);
};

module.exports = reSend;
