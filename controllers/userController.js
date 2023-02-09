module.exports.profile=function(req,res)
{
    return res.render('profile');
     
    
}
const User=require('../models/user');
module.exports.create=function(req,res){
    
    if(req.body.password!=req.body.confirmPassword){
       // prompt("Password mismatch");
        return res.redirect('back');
    }
     User.findOne({email:req.body.email}, function(err,user){
        
        if(!user){
            User.create(req.body, function(err,user){
                //prompt("User successfully created");
                return res.redirect('/');
            })
        }
        else
        {
            //prompt("User already exist");
            return res.redirect('back');
        }
        
    })
}
module.exports.createSession=function(req,res){
    return res.redirect('/users/profile');
    
    }
    module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err) return res.redirect('/');
        else
        {
            return res.redirect('/');
        }
    });
    
    }