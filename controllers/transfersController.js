const mongoose = require('mongoose');
const Transfers = require('../model/Transfers');
const TransfersDetail = require('../model/TransfersDetail');
const moment = require('moment');

exports.getTransfers = async (req, res, next) => {
  const page = req.query.pageId || 1;
  const perPage = req.query.perPage || 10;
  const transfers = await Transfers.find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ date: -1 })
    .populate('store');
  const numberOfTransfers = await Transfers.find().countDocuments();
  if (transfers) {
    res.status(200).json({ transfers, numberOfTransfers });
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.searchTransfers = async (req, res, next) => {
  const page = req.query.pageId || 1;
  const perPage = req.query.perPage || 10;
  const { to, from, number, weight } = req.body;
  const filtered = {};
  mongoose.Types.ObjectId.isValid(req.body.store)
    ? (filtered['store'] = req.body.store)
    : { ...filtered };
  const transfers = await Transfers.find({
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
    number: { $regex: number },
    ...filtered,
  })
    .populate('store')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ date: -1 });
  const numberOfTransfers = await Transfers.find({
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
    number: { $regex: number },
    ...filtered,
  }).countDocuments();
  if (transfers) {
    res.status(200).json({ transfers, numberOfTransfers });
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.addTransfer = async (req, res, next) => {
  const transfer = await Transfers.create({ ...req.body });
  if (transfer) {
    const from = `${moment(req.body.date)
      .subtract(1, 'month')
      .format('YYYY/MM/DD')}`;
    const to = `${req.body.date.split('T')}T23:59:59.999Z`;
    const transfers = await Transfers.find({ date: { $gt: from }, $lt: to })
      .sort({ date: -1 })
      .limit(10);
    const numberOfTransfers = await Transfers.find({
      date: { $gt: from },
      $lt: to,
    })
      .sort({ date: -1 })
      .countDocuments();
    res.status(201).json({ transfers, numberOfTransfers });
  } else {
    res.status(422).json({ message: 'Error' });
  }
};

exports.deleteTransfer = async (req, res, next) => {
  const transferDetail = await TransfersDetail.find({
    transferId: req.params.id,
  }).countDocuments();
  if (transferDetail > 0) {
    res.status(403).json({ message: 'Error' });
  } else {
    const transfer = await Transfers.findByIdAndRemove({ _id: req.params.id });
    if (transfer) {
      res.status(201).json({ message: 'Success' });
    } else {
      res.status(422).json({ message: 'Error' });
    }
  }
};

exports.updateTransfer = async (req, res, next) => {
  const numbers = await TransfersDetail.findOne({
    _id: req.params.id,
  }).countDocuments();
  let sumOfTransferDetail = [];

  numbers > 0
    ? (sumOfTransferDetail = await TransfersDetail.aggregate([
        { $match: { transferId: mongoose.Types.ObjectId(req.params.id) } },
        { $group: { _id: 'source', total: { $sum: '$sourceWeight' } } },
      ]))
    : (sumOfTransferDetail = [{ _id: 'total', total: 0 }]);
  if (sumOfTransferDetail[0].total < req.body.weight) {
    const transfer = await Transfers.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (transfer) {
      res.status(201).json(transfer);
    } else {
      res.status(422).json({ message: 'Error' });
    }
  } else {
    res.status(403).json({ message: 'Error' });
  }
};
