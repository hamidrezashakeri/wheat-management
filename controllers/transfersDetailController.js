const TransfersDetail = require('../model/TransfersDetail');
const Transfers = require("../model/Transfers");
const moment = require('moment');

exports.getTransfersDetail = async (req, res, next) => {
    const page = req.query.pageId || 1;
    const perPage = req.query.perPage || 10;
    const transfers = await TransfersDetail.find({ transferId: req.params.id }).skip((page - 1) * perPage).limit(perPage).sort({ date: -1 }).populate('transferId');
    const numbers = await TransfersDetail.find({ transferId: req.params.id }).countDocuments();
    if (transfers) {
        res.status(200).json({ transfers, numbers });
    } else {
        res.status(404).json({ message: 'Error' });
    }
}

exports.searchTransfersDetail = async (req, res, next) => {
    const page = req.query.pageId || 1,
        perPage = req.query.perPage || 10;
    const { to, from, sourceWeight, destinationWeight, weightNumber, driver, numberTruck, rentState } = req.body.search;
    let transfers = [];
    let numbers = 0;
    if (rentState !== '') {
        transfers = await TransfersDetail.find(
            {
                transferId: req.body.transferId,
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
                rentState: { $eq: rentState },
                driver: { $regex: driver, $options: 'i' },
                numberTruck: { $regex: numberTruck, $options: 'i' }
            }).skip((page - 1) * perPage).limit(perPage).sort({ date: -1 }).populate("transferId");
        numbers = await TransfersDetail.find(
            {
                transferId: req.body.transferId,
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
                rentState: { $eq: rentState },
                driver: { $regex: driver, $options: 'i' },
                numberTruck: { $regex: numberTruck, $options: 'i' }
            }).countDocuments();
    } else {
        transfers = await TransfersDetail.find(
            {
                transferId: req.body.transferId,
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
                numberTruck: { $regex: numberTruck, $options: 'i' }
            }).skip((page - 1) * perPage).limit(perPage).sort({ date: -1 }).populate("transferId");
        numbers = await TransfersDetail.find(
            {
                transferId: req.body.transferId,
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
                numberTruck: { $regex: numberTruck, $options: 'i' }
            }).countDocuments();
    }

    if (transfers) {
        res.status(200).json({ transfers, numbers });
    } else {
        res.status(404).json({ message: 'Error' });

    }
}

exports.addTransferDetail = async (req, res, next) => {
    const transfer = await Transfers.findOne({ _id: req.params.id });
    if (transfer) {
        let { weight, issued } = transfer;
        const { sourceWeight, destinationWeight } = req.body;
        if (sourceWeight + issued <= weight && destinationWeight + issued <= weight) {
            issued += destinationWeight;
            const transferDetail = await TransfersDetail.create({ ...req.body, transferId: req.params.id });
            if (transferDetail) {
                transfer.issued = issued;
                transfer.save();
                const from = `${moment(req.body.date)
                    .subtract(1, 'days')
                    .format('YYYY/MM/DD')}`;
                  const to = `${req.body.date.split('T')}T23:59:59.999Z`;
                  const transfersDetail = await TransfersDetail.find({ date: { $gt: from }, $lt: to })
                    .sort({ date: -1 })
                    .limit(10);
                  const numbers = await Transfers.find({
                    date: { $gt: from },
                    $lt: to,
                  })
                    .countDocuments();
                  res.status(201).json({ transfers:transfersDetail, numbers });
            } else {
                res.status(422).json({ message: 'Error' });
            }
        } else {
            res.status(403).json({ message: 'Error' });
        }
    } else {
        res.status(404).json({ message: 'Error' });
    }
}

exports.deleteTransferDetail = async (req, res) => {
    const transferDetail = await TransfersDetail.findByIdAndRemove({ _id: req.params.id });
    if (transferDetail) {
        const transfer = await Transfers.findOne({ _id: transferDetail.transferId });
        transfer.issued -= transferDetail.destinationWeight;
        await transfer.save();
        res.status(201).json({ message: 'Success' });
    } else {
        res.status(422).json({ message: 'Error' });
    }
}

exports.updateTransferDetail = async (req, res) => {
    const transfer = await Transfers.findOne({ _id: req.params.id });
    if (transfer) {
        let { weight, issued } = transfer;
        const { date, sourceWeight, destinationWeight, weightNumber, driver, numberTruck } = req.body;
        let transferDetail = await TransfersDetail.findOne({ _id: req.body.id });
        if (sourceWeight - transferDetail.sourceWeight + issued < weight && destinationWeight - transferDetail.destinationWeight + issued < weight) {
            issued = issued - transferDetail.destinationWeight + destinationWeight;
            transfer.issued = issued;
            transferDetail.date = date;
            transferDetail.sourceWeight = sourceWeight;
            transferDetail.destinationWeight = destinationWeight;
            transferDetail.weightNumber = weightNumber;
            transferDetail.driver = driver;
            transferDetail.numberTruck = numberTruck;
            await transfer.save();
            await transferDetail.save();
            res.status(201).json(transferDetail);
        } else {
            res.status(403).json({ message: 'Error' });
        }
    }
}