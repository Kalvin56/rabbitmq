const express = require('express');
const router = express.Router();
const command = require("./Controller/Command");

router.post('/commands', command.create)
router.get('/commands', command.getAll)
router.get('/commands/:id', command.getId)
router.delete('/commands/:id', command.deleteId)
router.put('/commands', command.put)

module.exports = router;