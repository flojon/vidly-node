
module.exports = function(err, req, res, next) {
    if (err.details && err.details[0])
        res.status(400).send(err.details[0].message);
    else
        res.status(500).send(err);
}
