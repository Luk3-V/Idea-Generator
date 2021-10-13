const express = require("express");
const router = express.Router();
const {generate} = require('../main/generator');

router.get('/', function(req, res, next) {
	console.log('index page loaded');
	res.render('index');
});

router.get('/generate', function(req, res, next) {
	console.log('generating...' + req.query);
	let result = generate(req.query);
	res.json(result);
});

module.exports = router;