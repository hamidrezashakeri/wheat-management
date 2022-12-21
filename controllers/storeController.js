const Store = require('../model/store');
const QoutaSales = require('../model/QoutaSales');
const Transfers = require('../model/Transfers');

exports.allStore = async(req, res, next)=>{
    const page = req.query.pageId || 1;
    const perPage = req.query.perPage ? req.query.perPage : 10;
    const numberOfStores = await Store.find().countDocuments();
    const stores = await Store.find().skip((page -1)*perPage).limit(perPage);

    if(stores){
        res.status(200).json({stores, numberOfStores});
    }else{
        res.status(404).json({message: 'Error'});
    }
}


exports.addStore = async(req, res, next)=>{
    const store = await Store.create(req.body);

    if(store){
        res.status(201).json({message: 'Success'});
    }else{
        res.status(422).json({message: "Error"});
    }
}

exports.deleteStore = async(req, res, next)=>{
    const qoutaSales = await QoutaSales.find({store: req.params.id}).countDocuments();
    const transfers = await Transfers.find({store:req.params.id}).countDocuments();
    if(qoutaSales >0 || transfers> 0){
        res.status(401).json({message: 'Error'});
    }else{
        const store = await Store.findByIdAndRemove(req.params.id);
        if(store){
            res.status(201).json({message: 'Success'});
        }else{
            res.status(422).json({message: 'Error'});
        }
    }
}

exports.updateStore = async(req, res, next)=>{
    const store = await Store.findOne({_id: req.params.id});
    if(store){
        const { name, city, status} = req.body;
        store.name = name;
        store.city = city;
        store.status = status;
        await store.save();
        res.status(201).json({message: 'Success'});
    }else{
        res.status(404).json({message: 'Error'});
    }
}

exports.changeStatusStore = async(req, res, next)=>{
    const store = await Store.findOne({_id: req.body.id});
    if(store){
        store.status = !store.status;
        await store.save();
        res.status(200).json({message: 'Success'})
    }else{
        res.status(404).json({message: 'Error'});
    }
}

exports.searchStores = async(req, res, next)=>{
    const page = req.query.pageId || 1;
    const perPage = req.query.perPage ? req.query.perPage : 10;
    const numberOfStores = await Store.find({name: {$regex: req.body.search, $options: 'i'}}).countDocuments();
    const stores = await Store.find({name: {$regex: req.body.search, $options: 'i'}}).skip((page -1)*perPage).limit(perPage);
    if(stores){
        res.status(200).json({stores, numberOfStores});
    }else{
        res.status(404).json({message: 'Error'});
    }
}