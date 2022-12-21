const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async(req, res, next)=>{
    const { fullname, nationalCode, username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = User.create({...req.body, password: hash});
    if(user){
        console.log(user);
        res.status(201).json({message: 'Success'});
    }else{
        res.status(422).json({message: 'Error'});
    }
}

exports.handleLogin = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user){
        res.status(422).json({message: 'Error'});
    }else{
        const secret = "hV37j4WfWxqz9r2";
        const isEqual = await bcrypt.compare(password, user.password);
        if(isEqual){
            const token = jwt.sign({
                user:{
                    userId: user._id,
                    fullname: user.fullname,
                    nationalCode: user.nationalCode
                },
                
            },secret, {expiresIn: '1h'});
            res.status(200).json({token});
        }else{
            res.status(422).json({message: 'Error'});
        }
    }

}

exports.updatePassword = async(req, res, next)=>{
    const { newPassword, oldPassword } = req.body;
    const user = await User.findOne({_id: req.params.id});
    if(user){
        const isEqual = await bcrypt.compare(oldPassword, user.password);
        if(isEqual){
            const hash = await bcrypt.hash(newPassword, 10);
            user.password = hash;
            await user.save();
            res.status(201).json({message: 'Success'});
        }else{
            res.status(401).json({message: 'Error'});
        }
    }else{
        res.status(404).json({message: 'Error'});
    }
}