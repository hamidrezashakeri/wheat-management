const TransferQoutaSale = require('../model/TransferQoutaSale');
const TransfersDetail = require('../model/TransfersDetail');
const BuysDirectly = require('../model/BuysDirectly');
const Stores = require("../model/store");
const Products = require('../model/Product');
const Payments = require('../model/Payments');
const mongoose = require('mongoose');
exports.materialBalance = async (req, res, next) => {
  const from = `${req.body.from.split('T')[0]}T00:00:00.000Z`;
  const to = `${req.body.to.split('T')[0]}T23:59:59.999Z`;

  const weightBuysDirect = await BuysDirectly.aggregate([
    { $match: { date: { $gt: new Date(from), $lt: new Date(to) } } },
    { $group: { _id: 'weight', total: { $sum: '$weight' } } },
  ])

  const transferInfo = await TransfersDetail.aggregate([
    { $match: { date: { $gt: new Date(from), $lt: new Date(to) } } },
    { $group: { _id: '$store', totalSource: { $sum: '$sourceWeight' }, totalDest: { $sum: '$destinationWeight' } } },
  ]);


  const transferWeight = await Promise.all(transferInfo.map(async (transfer) => {
    const store = await Stores.findOne({ _id: transfer._id });
    transfer._id = store;
    return transfer
  }))

  const transfersQoutaSaleWeightInfo = await TransferQoutaSale.aggregate([
    { $match: { date: { $gt: new Date(from), $lt: new Date(to) } } },
    { $group: { _id: { 'store': '$store', 'type': '$type' }, totalSource: { $sum: '$sourceWeight' }, totalDest: { $sum: '$destinationWeight' } } },
  ]);

  const transfersQoutaSaleWeight = await Promise.all(transfersQoutaSaleWeightInfo.map(async (transfer) => {
    const store = await Stores.findOne({ _id: transfer._id.store });
    const type = await Products.findOne({ _id: transfer._id.type })

    transfer._id.store = store;
    transfer._id.type = type;

    return transfer;
  }));
  if (weightBuysDirect.length > 0 ||
    transfersQoutaSaleWeight.length > 0 ||
    transferWeight.length > 0
  ) {
    res
      .status(200)
      .json({
        weightBuysDirect,
        transfersQoutaSaleWeight,
        transferWeight
      });
  } else {
    res.status(200).json({});
  }
};

exports.transfersReport = async (req, res, next) => {
  const page = req.query.pageId || 1;
  const perPage = req.query.perPage || 10;
  const { from, to, transaction, store, sourceWeight, destinationWeight, weightNumber, numberTruck, driver, rentStatus } = req.body;
  let filtered = {};
  mongoose.Types.ObjectId.isValid(store) ? filtered['store'] = store : { ...filtered }
  rentStatus !== '' ? filtered['rentState'] = { $eq: rentStatus }: {...filtered};
  const options = {
    date: { $gt: `${from.split("T")[0]}T00:00:00.000Z`, $lt: `${to.split("T")[0]}T23:59:59.999Z` },
    $and: [

      {
        $expr: {
          $regexMatch: {
            input: { $toString: `$sourceWeight` },
            regex: sourceWeight,
          }
        },
      },
      {
        $expr: {
          $regexMatch: {
            input: { $toString: `$destinationWeight` },
            regex: destinationWeight,
          }
        },
      }

    ],
    weightNumber: { $regex: weightNumber, $options: 'i' },
    driver: { $regex: driver, $options: 'i' },
    numberTruck: { $regex: numberTruck, $options: 'i' },
    ...filtered
  }
  const transfers = await TransfersDetail.find(options).populate('store');
  const transfersCount = await TransfersDetail.find(options).countDocuments();
  const qoutaSales = await TransferQoutaSale.find(options).populate('store');
  const qoutaSalesCount = await TransferQoutaSale.find(options).countDocuments();
  const reports = [...transfers, ...qoutaSales];
  switch (transaction) {
    case 'all':
      res.status(200).json({ reports: reports.slice((page-1)*perPage, ((page-1)*perPage)+perPage), numbers: transfersCount + qoutaSalesCount });
      break;
    case 'transfer':
      res.status(200).json({ reports: transfers.slice((page-1)*perPage, ((page-1)*perPage)+perPage), numbers: transfersCount});
      break;
    case 'qoutasale':
      res.status(200).json({ reports: qoutaSales.slice((page-1)*perPage, ((page-1)*perPage)+perPage), numbers: qoutaSalesCount});
      break;
    default:
      res.status(404).json({message: 'Error'});
  }
}

exports.paymentsReport = async(req, res, next)=>{
  const from = `${req.body.from.split('T')[0]}T00:00:00.000Z`;
  const to = `${req.body.to.split('T')[0]}T23:59:59.999Z`;
  const paymentsInfo = await Payments.aggregate([
    { $match: { date: { $gt: new Date(from), $lt: new Date(to) } } },
    { $group: { _id: '$type', totalAmount: { $sum: '$amount' }, totalIssued: { $sum: '$issued'} } },
  ]);
  const payment = await Promise.all(paymentsInfo.map(async (payment) => {
    const type = await Products.findOne({ _id: payment._id });
    payment._id = type;
    return payment;
  }))
  if(payment.length > 0){
    res.status(200).json(payment);
  }else{
    res.status(404).json({message: 'Error'});
  }
}
