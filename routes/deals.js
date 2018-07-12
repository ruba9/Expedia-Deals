var express = require('express');
var router = express.Router();
var url = require('url');
var axios = require('axios');
var deals = require('../api/api-deals');
var dealsHandler = require('../api/deals')
/* GET home page. */

router.get('/', dealsHandler);

module.exports = router;