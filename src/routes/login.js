var express = require('express');
var router = express.Router();
const path = require('path');

//Routing for the login page//
router.get("/", function (req, res) {
    res.render(path.join('..', 'views', 'pages', 'login.ejs'), {login: true});
});

module.exports = router;