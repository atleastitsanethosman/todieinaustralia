const router = require('express').Router();
const { Submission, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const upload = require('../../utils/upload');
const remove = require('../../utils/remove')
const singleUpload = upload.single("image");
const aws = require("aws-sdk");



router.post('/', withAuth, async (req, res) => {
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

//route to send image to AWS S3 using multer by calling upload
router.post("/img", function (req, res) {
    singleUpload(req, res, function (err) {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Image Upload Error",
            detail: err.message,
            error: err,
          },
        });
      }
  
      let update = { img_link: req.file.location };
  
      console.log(update)
      res.status(200).json(update)
    });
  });


router.put('/:id', withAuth, (req, res) => {
    Submission.update(req.body, {where: {id: req.params.id}}).then((updatedSubmission) => res.json(updatedSubmission)).catch((err) => {
        res.status(400).json(err)
    })
})

//route specific to delete image from AWS s3 storage.
router.delete('/s3/:imgKey', withAuth, (req, res) => {
  remove(req.params.imgKey).then((updatedSubmission) => res.json(updatedSubmission)).catch((err) => {
    res.status(400).json(err)
  })
})

router.delete('/:id', withAuth, async (req, res) => {
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