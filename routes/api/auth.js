const express = require('express');

const router = express.Router();

const { yupUserSchema } = require('../../models/user');
const ctrl = require('../../controllers/auth');
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require('../../middlewares');

router.post(
  '/signup',
  validation(yupUserSchema),
  controllerWrapper(ctrl.signup),
);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.avatars);
router.post('/login', validation(yupUserSchema), controllerWrapper(ctrl.login));
router.get('/logout', authenticate, controllerWrapper(ctrl.logout));
router.get('/current', authenticate, controllerWrapper(ctrl.current));

module.exports = router;
