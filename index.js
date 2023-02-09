const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy.js');
app.set('view engine','ejs');
app.set('views','./views');
//using mongo store to store session cookie
app.use(session({
    name:'codeial',
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(express.static('./assets')); //to use css files
app.use(expressLayouts);//use it before routes
//to extract styles and scripts from subpages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express router at the end of middlewares
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log('server id running on port',port);
})