const mongoose = require('mongoose');
const Payment = require('../model/Payments');
const Product = require("../model/Product");
const QoutaSales = require("../model/QoutaSales");
const moment = require('moment');
exports.allPeyments = async (req, res, next) => {
    const page = req.query.pageId || 1;
    const perPage = req.query.perPage || 10;
    const { type, bank, from, to } = req.body;
    const filtred = {};
    mongoose.Types.ObjectId.isValid(type) ? filtred['type'] = type : { ...filtred };
    const payments = await Payment.find({ bank: { $regex: bank, $options: "i" }, date: { $gt: `${from.split('T')[0]}T00:00:00.000Z`, $lt: `${to.split('T')[0]}T23:59:59.999Z` }, ...filtred }).populate("type").sort({ date: -1 }).skip((page-1)*perPage).limit(perPage);
    if (payments) {
        res.status(200).json(payments);
    } else {
        res.status(404).json({ message: 'Error' });
    }

}

exports.updatePayment = async (req, res, next) => {
    const { amount } = req.body;
    let qoutaSales = [];
    const numbers = await QoutaSales.find({ paymentId: req.params.id }).countDocuments();
    numbers > 0 ? qoutaSales = await QoutaSales.aggregate([{ $match: { paymentId: mongoose.Types.ObjectId(req.params.id) } }, { $group: { _id: 'total', total: { '$sum': '$weight' } } }]) : qoutaSales = [{ _id: 'total', total: 0 }];
    if (qoutaSales[0].total > amount) {
        res.status(401).json({ message: 'Error' });
    } else {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('type');
        if (payment) {
            res.status(201).json(payment);
        } else {
            res.status(422).json({ message: 'Error' });
        }
    }
}

exports.deletePayment = async (req, res, next) => {
    const numberOfQoutaSales = await QoutaSales.find({ paymentId: req.params.id }).countDocuments();
    if (numberOfQoutaSales > 0) {
        res.status(403).json({ mesaage: 'Error' });
    } else {
        const payment = await Payment.findByIdAndRemove({ _id: req.params.id });
        if (payment) {
            res.status(201).json({ message: 'success' });
        } else {
            res.status(422).json({ message: 'Error' });
        }
    }
}


exports.addPayment = async (req, res, next) => {
    const payment = await Payment.create(req.body);
    if (payment) {
        const from = `${moment(req.body.date).subtract(1, 'month').format('YYYY/MM/DD')}`;
        const to = `${req.body.date.split("T")}T23:59:59.999Z`;
        const payments = await Payment.find({ date: { $gt: from }, $lt: to }).populate('type').sort({ date: -1 });
        res.status(201).json(payments);
    } else {
        res.status(422).json({ message: 'Error' });
    }
}