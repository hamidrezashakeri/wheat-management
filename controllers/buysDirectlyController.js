const BuysDirectly = require('../model/BuysDirectly');
const moment = require('moment');
exports.getBuysDirectly = async (req, res, next) => {
  const page = req.query.pageId || 1;
  const perPage = req.query.perPage || 10;
  const {
    to,
    from,
    weight,
    weightNumber,
    driver,
    numberTruck,
    name,
    nationalCode,
  } = req.body;
  const filtered = {};
  req.body.rentStatus !== ''
    ? (filtered['rentStatus'] = req.body.rentStatus)
    : { ...filtered };
  const buysDirectly = await BuysDirectly.find({
    date: {
      $gt: `${from.split('T')[0]}T00:00:00.000Z`,
      $lt: `${to.split('T')[0]}T23:59:59.999Z`,
    },
    $expr: {
      $regexMatch: {
        input: { $toString: `$weight` },
        regex: weight,
      },
    },
    weightNumber: { $regex: weightNumber },
    driver: { $regex: driver },
    numberTruck: { $regex: numberTruck },
    name: { $regex: name },
    nationalCode: { $regex: nationalCode },
    ...filtered,
  })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({date: -1});
  if (buysDirectly) {
    res.status(200).json(buysDirectly);
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.addBuysDirectly = async (req, res, next) => {
  const buysDirectly = await BuysDirectly.create({ ...req.body });
  if (buysDirectly) {
    const from = `${moment(req.body.date).subtract(1, 'days').format('YYYY/MM/DD')}`;
    const to = `${req.body.date.split("T")}T23:59:59.999Z`;
    const buys = await BuysDirectly.find({ date: { $gt: from }, $lt: to }).sort({ date: -1 }).limit(10);
    res.status(201).json(buys);
} else {
    res.status(422).json({ message: 'Error' });
}
};

exports.deleteBuysDirectly = async(req, res, next)=>{
  const buysDirectly = await BuysDirectly.findByIdAndRemove({_id: req.params.id});
  if(buysDirectly){
    res.status(201).json({message: 'Success'});
  }else{
    res.status(404).json({message: 'Error'});
  }
}

exports.changeStatusRent = async(req, res, next)=>{
  const buyDirectly = await BuysDirectly.findOne({_id: req.body.id});
  if(buyDirectly){
    buyDirectly.rentStatus = true;
    await buyDirectly.save();
    res.status(201).json({message: 'Success'});
  }else{
    res.status(404).json({message: 'Error'});
  }
}

exports.updateBuysDirectly = async(req, res, next)=>{
  const buyDirectly = await BuysDirectly.findByIdAndUpdate(req.params.id, req.body, {new: true});
  if(buyDirectly){
    res.status(201).json(buyDirectly);
  }else{
    res.status(422).json({message: 'Error'});
  }
}
