const Product = require('../model/Product');
const Payments = require('../model/Payments');


exports.getAllProducts = async(req, res, next)=>{
    
    const page = req.query.pageId || 1;
    const perPage = req.query.perPage || 10;
    const numberOfProducts = await Product.find().countDocuments();
    const products = await Product.find().skip((page-1)*perPage).limit(perPage);
    if(products){
        res.status(200).json({products, numberOfProducts});
    }else{
        res.status(404).json({message: 'Error'});
    }
}


exports.addProduct = async(req, res, next)=>{
    const product = await Product.create(req.body);
    if(product){
        res.status(201).json({message: 'Success'});
    }else{
        res.status(422).json({message: 'Error'});
    }
}

exports.deleteProduct = async(req, res, next)=>{
    const payments = await Payments.find({type: req.params.id}).countDocuments();
    if(payments > 0){
        res.status(401).json({message: 'Error'});
    }else{
        const product = await Product.findByIdAndRemove(req.params.id);
        if(product){
            res.status(201).json({message: 'Success'})
        }else{
            res.status(422).json({message: 'Error'});
        }
    }
}

exports.updateProduct = async(req, res, next)=>{
    const product = await Product.findOne({_id: req.params.id});

    if(product){
        const { nameProduct, priceProduct} =req.body;
        product.nameProduct = nameProduct;
        product.priceProduct = priceProduct;
        await product.save();
        res.status(201).json({message: 'Success'});
    }else{
        res.status(404).json({message: 'Error'});
    }
}

exports.searchProducts = async(req, res, next)=>{
    const page = req.query.pageId || 1;
    const perPage = req.query.perPage ? req.query.perPage : 10;
    const numberOfProducts = await Product.find({nameProduct: {$regex: req.body.search, $options: 'i'}}).countDocuments();
    const products = await Product.find({nameProduct: {$regex: req.body.search, $options: 'i'}}).skip((page -1)*perPage).limit(perPage);
    if(products){
        res.status(200).json({products, numberOfProducts});
    }else{
        res.status(404).json({message: 'Error'});
    }
}