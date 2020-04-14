const CoronaStats = require('../../../models/CoronaStats');

const getAll = (req, res) => {
  CoronaStats.find({}, (err, docs) => {
    if(!err){
      res.json({
        "status": "success",
        "data": {
          "stats": docs
        }
      });
    }
  });
}

const create = (req, res) => {
  let coronaStats = new CoronaStats();
  coronaStats.country = req.body.coronaStats.country;
  coronaStats.numberInfected = req.body.coronaStats.numberInfected;
  coronaStats.save( (err, doc) => {
    if(err){
      res.json({
        "status": "error",
        "message": "Could not save this stats."
      });
    }

    if(!err){
      res.json({
        "status": "success",
        "data": {
          "stat": doc
        }
      });
    }
  });
}

const update = (req, res) => {
  let countryId = req.body._id;
  let numberInfected = req.body.numberInfected;
  CoronaStats.findOneAndUpdate({
      _id: countryId
  },{
      numberInfected: numberInfected
  }, {new: true}).then(doc => {
      res.json({
          "status": "success",
          "data": {
            "stat": doc
          }
      });
  }).catch(err => {
      res.json({
        "status": "error",
        "message": err
      });
  });
}

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.update = update;