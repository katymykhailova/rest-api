const { NotFound } = require('http-errors');
const { User } = require('../../models');

const verify = async (req, res) => {
  const user = await User.findOne({ verifyToken: req.params.verifyToken });

  if (!user) {
    throw new NotFound();
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });

  res.send('Email verified!');
};

module.exports = verify;
