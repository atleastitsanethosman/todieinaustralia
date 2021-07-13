const router = require('express').Router();
const { Submission, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
try {
    const newSubmission = await Submission.create({
    ...req.body,
    user_id: req.session.user_id,
    });

    res.status(200).json(newSubmission);
} catch (err) {
    res.status(400).json(err);
}
});

router.put('/:id', (req, res) => {
    Submission.update(req.body, {where: {id: req.params.id}}).then((updatedSubmission) => res.json(updatedSubmission)).catch((err) => {
        res.status(400).json(err)
    })
})

router.delete('/:id', async (req, res) => {
try {
    const submissionData = await Submission.destroy({
    where: {
        id: req.params.id,
        //user_id: req.session.user_id,
    },
    });

    if (!submissionData) {
    res.status(404).json({ message: 'No project found with this id!' });
    return;
    }

    res.status(200).json(submissionData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;