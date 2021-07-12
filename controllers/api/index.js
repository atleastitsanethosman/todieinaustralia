const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const submissionRoutes = require('./Submission-routes');
const userRoutes = require('./User-routes');

router.use('/comment-routes', commentRoutes);
router.use('/Submission-routes', submissionRoutes);
router.use('/User-routes', userRoutes);

module.exports = router;