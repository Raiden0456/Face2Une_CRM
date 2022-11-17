var express = require('express');
var router = express.Router();
const path = require('path');

//Routing for the home page//
router.get("/", function (req, res) {
    res.render(path.join('..', 'views', 'pages', 'index.ejs'));
});
module.exports = router;
