const express = require('express');

const router = express.Router();

router.get('*', (req, res) => {
  return res.status(404).send('Page not found');
})

module.exports = router;