const User = require('../models/User');

const sendTokenResponse = (user,statusCode,res)=>{
    const token = user.getSignedJwtToken()
    
    const option = {
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    };

    if(process.env.NODE_ENV === 'production'){
        option.secure= true;
    }

    res.status(statusCode).cookie('token',token,option).json({success:true,token});
};

//@desc     Register User
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = async (req,res,next)=>{
    try {
        const {name,telephone,email,password} = req.body;
        const user = await User.create({
            name,
            telephone,
            email,
            password
        });
        sendTokenResponse(user,200,res);
    } catch (error) {
        res.status(400).json({success:false})
        console.log(error.stack);
    }
};

//@desc     Login to registerd User
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = async (req,res,next)=>{
    try {
        const{email,password} = req.body;

        //Validate
        if(!email||!password){
            return res.status(400).json({success:false,msg:'Please provide an email and password'});
        }

        const user = await User.findOne({email}).select('+password')
        if(!user){
            return res.status(400).json({success:false,msg:'Invalid credentials'});
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({success:false,msg:'Invalid credentials'});
        }

        sendTokenResponse(user,200,res);
    } catch (error) {
        res.status(400).json({success:false})
        console.log(error.stack);
    }
};

exports.getMe= async (req,res,next)=>{
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success:true,
            data:user
        });
    } catch (error) {
        res.status(400).json({success:false})
        console.log(error.stack);
    }
};

//@desc     Log user out / clear cookie
//@route    GET /api/v1/auth/logout
//@access   Private
exports.logout = async (req,res,next)=>{
    res
        .status(200)
        .cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        .json({ success: true, data: {} });
};
