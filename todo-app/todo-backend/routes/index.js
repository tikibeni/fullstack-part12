const express = require('express');
const redis = require('redis');
const router = express.Router();

const configs = require('../util/config')
const { getAsync } = require('../redis');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_, res) => {
  const count = await getAsync('postcount')
  if (count) {
    res.send({ added_todos: Number(count) })
  } else {
    res.send({ added_todos: 0 })
  }
})

module.exports = router;
