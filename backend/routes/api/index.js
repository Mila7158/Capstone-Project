const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postsRouter = require('./posts.js');
const commentsRouter = require('./comment.js');
// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use("/comments", commentsRouter);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// Keep this route to test frontend setup in Mod 5
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);






module.exports = router;