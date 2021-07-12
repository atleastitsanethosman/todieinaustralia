const router = require('express').Router();
const { } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all 

  Category.findAll({
    include: {
    }
  })
    .then(dbCatData => {
      if (!dbCatData) {
        res.status(404).json({ message: 'No category found' });
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
    .then(dbCatData => {
      if (!dbCatData) {
        res.status(400).json({ message: 'No categories found' });
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.post('/', (req, res) => {

    .then(dbCatData => res.json(dbCatData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
    .then(dbCatData => {
      if (!dbCatData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {

    .then(dbCatData => {
      if (!dbCatData) {
        res.status(404).json({ message: 'No category found with that id.' });
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;