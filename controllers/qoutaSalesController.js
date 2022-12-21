const QoutaSales = require('../model/QoutaSales');
const Payments = require('../model/Payments');
const TransferQoutaSale = require('../model/TransferQoutaSale');
const moment = require('moment');
const mongoose = require('mongoose');

exports.getQoutaSales = async (req, res, next) => {
  const qoutaSales = await QoutaSales.find().populate('type').populate('store');
  if (qoutaSales) {
    res.status(200).json(qoutaSales);
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.getSingleQoutaSales = async (req, res, next) => {
  const qoutaSales = await QoutaSales.find({ _id: req.params.id })
    .populate('store')
    .populate('type');
  if (qoutaSales) {
    res.status(200).json({ qoutaSales });
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.qoutaSaleByPaymentId = async (req, res, next) => {
  const qoutaSales = await QoutaSales.find({ paymentId: req.params.id })
    .populate('store')
    .populate('type');
  if (qoutaSales) {
    res.status(200).json({ qoutaSales });
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.newQoutaSales = async (req, res, next) => {
  const paymentId = req.params.id;
  const qoutaSales = await QoutaSales.create({ ...req.body, paymentId });
  if (qoutaSales) {
    const { weight } = qoutaSales;
    let payment = await Payments.findOne({ _id: paymentId }).populate('type');
    let { amount, issued, remaining } = payment;
    if (weight <= amount) {
      issued = issued + weight;
      if (issued <= amount) {
        remaining = amount - issued;
        payment.issued = issued;
        payment.remaining = remaining;
        await payment.save();
        res.status(201).json({ qoutaSales, payment });
      } else {
        res.status(403).json({ message: 'Error' });
      }
    } else {
      res.status(403).json({ message: 'Error' });
    }
  } else {
    res.status(422).json({ message: 'Error' });
  }
};

exports.searchQoutaSales = async (req, res, next) => {
  const page = req.query.pageId || 1;
  const perPage = req.query.perPage || 10;
  const { from, to, license, weight } = req.body;
  const filtered = {};
  mongoose.Types.ObjectId.isValid(req.body.type)
    ? (filtered['type'] = req.body.type)
    : { ...filtered };
  mongoose.Types.ObjectId.isValid(req.body.store)
    ? (filtered['store'] = req.body.store)
    : { ...filtered };
  const qoutaSales = await QoutaSales.find({
    date: {
      $gt: `${from.split('T')[0]}T00:00:00.000Z`,
      $lt: `${to.split('T')[0]}T23:59:59.999Z`,
    },
    number: { $regex: license, $options: 'i' },
    $expr: {
      $regexMatch: {
        input: { $toString: `$weight` },
        regex: weight,
      },
    },
    ...filtered,
  })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ date: -1 })
    .populate('type')
    .populate('store');
  if (qoutaSales) {
    res.status(200).json(qoutaSales);
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.deleteQoutaSale = async (req, res, next) => {
  const numberOfTransfers = await TransferQoutaSale.find({
    qoutaSale: req.params.id,
  }).countDocuments();
  if (numberOfTransfers > 0) {
    res.status(403).json({ message: 'Error' });
  } else {
    const qoutaSale = await QoutaSales.findByIdAndRemove({
      _id: req.params.id,
    });
    if (qoutaSale) {
      const payment = await Payments.findOne({
        _id: qoutaSale.paymentId,
      }).populate('type');
      payment.issued = Number(payment.issued) - Number(qoutaSale.weight);
      await payment.save();
      res.status(201).json(payment);
    } else {
      res.status(422).json({ message: 'Error' });
    }
  }
};

exports.updateQoutaSale = async (req, res, next) => {
  const { weight } = req.body;
  const qoutaSale = await QoutaSales.findOne({ _id: req.params.id });
  if (qoutaSale) {
    let transferQoutaSale = [];
    const payment = await Payments.findOne({ _id: qoutaSale.paymentId });
    const numbers = await TransferQoutaSale.find({
      qoutaSale: req.params.id,
    }).countDocuments();
    numbers > 0
      ? (transferQoutaSale = await TransferQoutaSale.aggregate([
          { $match: { qoutaSale: mongoose.Types.ObjectId(req.params.id) } },
          { $group: { _id: 'total', total: { $sum: '$destinationWeight' } } },
        ]))
      : (transferQoutaSale = [{ _id: 'total', total: 0 }]);
    if (
      transferQoutaSale[0].total > weight ||
      payment.issued - qoutaSale.weight + Number(weight) > payment.amount
    ) {
      res.status(403).json({ messgae: 'Error' });
    } else {
      const updatedQoutaSale = await QoutaSales.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
        .populate('type')
        .populate('store');
      if (updatedQoutaSale) {
        payment.issued = payment.issued - qoutaSale.weight + Number(weight);
        await payment.save();
        res.status(201).json(updatedQoutaSale);
      } else {
        res.status(422).status({ message: 'Error' });
      }
    }
  }
};

exports.newTransferQoutaSale = async (req, res, next) => {
  const qoutaSale = await QoutaSales.findOne({ _id: req.params.id });
  if (qoutaSale) {
    let { weight, issued } = qoutaSale;
    const { date, sourceWeight, destinationWeight } = req.body;
    if (
      Number(sourceWeight) <= Number(weight) &&
      Number(destinationWeight) <= Number(weight)
    ) {
      const transferQoutaSale = await TransferQoutaSale.create({
        date: moment(date).format('YYYY/MM/DD'),
        ...req.body,
        qoutaSale: req.params.id,
      });
      if (transferQoutaSale) {
        issued = Number(issued) + Number(sourceWeight);
        if (issued <= weight) {
          qoutaSale.issued = issued;
          qoutaSale.save();
          res.status(201).json({ message: 'Success' });
        } else {
          res.status(403).json({ message: 'Error' });
        }
      } else {
        res.status(422).json({ message: 'Error' });
      }
    } else {
      res.status(403).json({ message: 'Error' });
    }
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.getTransfersQoutaSale = async (req, res, next) => {
  const page = req.query.pageId || 1;
  const perPage = req.query.perPage || 10;
  const transfers = await TransferQoutaSale.find({ qoutaSale: req.params.id })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ date: -1 })
    .populate('qoutaSale')
    .populate('store');
  const numbers = await TransferQoutaSale.find({
    qoutaSale: req.params.id,
  }).countDocuments();
  if (transfers) {
    res.status(200).json({ transfers, numbers });
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.changeStatusRent = async (req, res, next) => {
  const transfer = await TransferQoutaSale.findOne({ _id: req.body.id });
  if (transfer) {
    transfer.rentState = true;
    await transfer.save();
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.searchTransfersQoutaSales = async (req, res, next) => {
  const page = req.query.pageId || 1,
    perPage = req.query.perPage || 10;
  const {
    to,
    from,
    sourceWeight,
    destinationWeight,
    weightNumber,
    driver,
    numberTruck,
    rentState,
  } = req.body.search;
  let transfers = [];
  let numbers = 0;
  if (rentState !== '') {
    transfers = await TransferQoutaSale.find({
      qoutaSale: req.body.qoutaSaleId,
      date: {
        $gt: `${from.split('T')[0]}T00:00:00.000Z`,
        $lt: `${to.split('T')[0]}T23:59:59.999Z`,
      },
      $and: [
        {
          $expr: {
            $regexMatch: {
              input: { $toString: `$sourceWeight` },
              regex: sourceWeight,
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: `$destinationWeight` },
              regex: destinationWeight,
            },
          },
        },
      ],
      weightNumber: { $regex: weightNumber, $options: 'i' },
      rentState: { $eq: rentState },
      driver: { $regex: driver, $options: 'i' },
      numberTruck: { $regex: numberTruck, $options: 'i' },
    })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ date: -1 })
      .populate('qoutaSale')
      .populate('type');
    numbers = await TransferQoutaSale.find({
      qoutaSale: req.body.qoutaSaleId,
      date: {
        $gt: `${from.split('T')[0]}T00:00:00.000Z`,
        $lt: `${to.split('T')[0]}T23:59:59.999Z`,
      },
      $and: [
        {
          $expr: {
            $regexMatch: {
              input: { $toString: `$sourceWeight` },
              regex: sourceWeight,
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: `$destinationWeight` },
              regex: destinationWeight,
            },
          },
        },
      ],
      weightNumber: { $regex: weightNumber, $options: 'i' },
      rentState: { $eq: rentState },
      driver: { $regex: driver, $options: 'i' },
      numberTruck: { $regex: numberTruck, $options: 'i' },
    }).countDocuments();
  } else {
    transfers = await TransferQoutaSale.find({
      qoutaSale: req.body.qoutaSaleId,
      date: {
        $gt: `${from.split('T')[0]}T00:00:00.000Z`,
        $lt: `${to.split('T')[0]}T23:59:59.999Z`,
      },
      $and: [
        {
          $expr: {
            $regexMatch: {
              input: { $toString: `$sourceWeight` },
              regex: sourceWeight,
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: `$destinationWeight` },
              regex: destinationWeight,
            },
          },
        },
      ],
      weightNumber: { $regex: weightNumber, $options: 'i' },
      driver: { $regex: driver, $options: 'i' },
      numberTruck: { $regex: numberTruck, $options: 'i' },
    })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ date: -1 })
      .populate('qoutaSale')
      .populate('type');
    numbers = await TransferQoutaSale.find({
      qoutaSale: req.body.qoutaSaleId,
      date: {
        $gt: `${from.split('T')[0]}T00:00:00.000Z`,
        $lt: `${to.split('T')[0]}T23:59:59.999Z`,
      },
      $and: [
        {
          $expr: {
            $regexMatch: {
              input: { $toString: `$sourceWeight` },
              regex: sourceWeight,
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: `$destinationWeight` },
              regex: destinationWeight,
            },
          },
        },
      ],
      driver: { $regex: driver, $options: 'i' },
      numberTruck: { $regex: numberTruck, $options: 'i' },
    }).countDocuments();
  }

  if (transfers) {
    res.status(200).json({ transfers, numbers });
  } else {
    res.status(404).json({ message: 'Error' });
  }
};

exports.deleteTransfersQoutaSale = async (req, res) => {
  const transfer = await TransferQoutaSale.findByIdAndRemove({
    _id: req.params.id,
  });
  if (transfer) {
    const qoutaSale = await QoutaSales.findOne({ _id: transfer.qoutaSale });
    qoutaSale.issued = Number(qoutaSale.issued) - Number(transfer.sourceWeight);
    await qoutaSale.save();
    res.status(201).json({ message: 'Success' });
  } else {
    res.status(422).json({ message: 'Error' });
  }
};

exports.updateTransferQoutaSale = async (req, res, next) => {
  const qoutaSale = await QoutaSales.findOne({ _id: req.params.id });
  if (qoutaSale) {
    let { weight, issued } = qoutaSale;
    const {
      date,
      sourceWeight,
      destinationWeight,
      weightNumber,
      driver,
      numberTruck,
    } = req.body;
    let transfer = await TransferQoutaSale.findOne({ _id: req.body.id });
    if (
      Number(sourceWeight) < Number(weight) &&
      Number(destinationWeight) < Number(weight)
    ) {
      issued =
        Number(issued) - Number(transfer.sourceWeight) + Number(sourceWeight);
      if (Number(issued) <= Number(weight)) {
        qoutaSale.issued = issued;
        transfer.date = date;
        transfer.sourceWeight = sourceWeight;
        transfer.destinationWeight = destinationWeight;
        transfer.weightNumber = weightNumber;
        transfer.driver = driver;
        transfer.numberTruck = numberTruck;
        await qoutaSale.save();
        await (await (await transfer.save()).populate('store')).populate('qoutaSale');
        res.status(201).json(transfer);
      } else {
        res.status(403).json({ message: 'Error' });
      }
    } else {
      res.status(403).json({ message: 'Error' });
    }
  }
};
