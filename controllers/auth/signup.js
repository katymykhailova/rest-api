const { v4 } = require('uuid');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const { User } = require('../../models');
const { sendSuccessRes, sendEmail } = require('../../helpers');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in us');
  }

  const avatar = gravatar.url(email, { protocol: 'https' });
  const verifyToken = v4();
  const newUser = new User({ email, verifyToken });

  newUser.setPassword(password);
  newUser.setAvatar(avatar);

  await newUser.save();

  const verifyEmail = {
    to: email,
    subject: 'Подтверждения регистрации на сайте',
    html: `
            <a href="http://localhost:3000/api/auth/verify/${verifyToken}" target="_blank">Подтвердить почту</a>
            `,
  };

  await sendEmail(verifyEmail);

  sendSuccessRes(res, { message: 'Success register' }, 201);
};

module.exports = signup;
