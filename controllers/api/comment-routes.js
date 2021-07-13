const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newComment)
  }catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  Comment.update(req.body, {where: {id: req.params.id}}).then((updatedCommment) => res.json(updatedComment)).catch((err) => {
      res.status(400).json(err)
  })
})

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        //user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'could not delete comment!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;