const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const { User } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in us');
  }

  // const avatar = gravatar.url(
  //   email,
  //   {
  //     s: '50',
  //     d: 'robo',
  //   },
  //   false,
  // );
  const avatar = gravatar.url(email, { protocol: 'https' });

  const newUser = new User({ email });

  newUser.setPassword(password);
  newUser.setAvatar(avatar);

  await newUser.save();

  sendSuccessRes(res, { message: 'Success register' }, 201);
};

module.exports = signup;
