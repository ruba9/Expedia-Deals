var express = require('express');
var router = express.Router();
var url = require('url');
/* GET home page. */
router.get('/', function(req, res, next) {
    var url_parts = url.parse(req.url, true)
    var destination = url_parts.query.destination
    var lengthOfStay = url_parts.query.lengthOfStay
    var minTripStartDate = url_parts.query.minTripStartDate
    var maxTripStartDate = url_parts.query.maxTripStartDate
    var maxStarRating = url_parts.query.maxStarRating
    var minStarRating = url_parts.query.minStarRating
    var minTotalRate = url_parts.query.minTotalRate
    var maxTotalRate = url_parts.query.maxTotalRate
    expediaUrl = `https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel`
    if (destination) expediaUrl = expediaUrl + `&destinationName=${destination}`
    if (lengthOfStay) expediaUrl = expediaUrl + `&lengthOfStay=${lengthOfStay}`
    if (minTripStartDate) expediaUrl = expediaUrl + `&minTripStartDate=${minTripStartDate}`
    if (maxTripStartDate) expediaUrl = expediaUrl + `&maxTripStartDate=${maxTripStartDate}`
    if (maxStarRating) expediaUrl = expediaUrl + `&maxStarRating=${maxStarRating}`
    if (minStarRating) expediaUrl = expediaUrl + `&minStarRating=${minStarRating}`
    if (minTotalRate) expediaUrl = expediaUrl + `&minTotalRate=${minTotalRate}`
    if (maxTotalRate) expediaUrl = expediaUrl + `&maxTotalRate=${maxTotalRate}`
    res.send('deal route');
 // res.render('index', { title: 'Express' });
});

module.exports = router;



   