const router = require('express').Router();
const { Submission, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all submissions and JOIN with user data
    const submissionData = await Submission.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment
        }
      ],
    });

    // Serialize data so the template can read it
    const submissions = submissionData.map((submission) => submission.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      submissions, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/submission/:id', async (req, res) => {
  try {
    const submissionData = await Submission.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            }
          ]
        }
      ],
    });

    const submission = submissionData.get({ plain: true });

    res.render('single-submission', {
      ...submission,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Submission, include: {model: Comment} }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

router.get('/dashboard/create', (req, res) => {
  res.render('create-post');
  return
});

router.get('/dashboard/edit/:id', async (req, res) => {
  try {
    const submissionData = await Submission.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            }
          ]
        }
      ],
    });

    const submission = submissionData.get({ plain: true });

    res.render('edit-post', {
      ...submission,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
