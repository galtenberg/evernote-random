const router = require('express').Router()

router.get('/', function(req, res, next) {
  var result = [
    { rating: 1, review_text: "awful", product_id: 5 },
    { rating: 1, review_text: "if you have too much extra money ", product_id: 1 },
    { rating: 5, review_text: "the best!", product_id: 2 },
    { rating: 2, review_text: "waste of money", product_id: 3 },
    { rating: 3, review_text: "can be better", product_id: 4 },
    { rating: 3, review_text: "should be better", product_id: 6 },
    { rating: 4, review_text: "good price", product_id: 7 },
    { rating: 4, review_text: "just like description", product_id: 1 }
  ]
  res.status(200).send(result);
});

module.exports = router;
