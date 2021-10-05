const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next) {
	console.log('index page loaded');
	res.render('index');
});

module.exports = router;