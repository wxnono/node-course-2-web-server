const express=require('express');
const hbs=require('hbs');
const fs = require('fs');


var app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',function(){
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',function(text){
  return text.toUpperCase;
})

app.use(express.static(__dirname+'/public'));
app.use(function(req,res,next){
var now = new Date().toString();
var log = now+':'+req.method+req.url ;
console.log(log);

fs.appendFile('server.log',log+'\n',function(err){
  if(err){console.log('Unable');}
});

next();

})




app.get('/',function(req,res){
//  res.send('<h1>Hello Express!</h1>');
res.render('home.hbs',{
  pageTitle:'Home Page',
  currentYear: new Date().getFullYear(),
  welcomeMessage: 'HoHoHo'
})
});

app.get('/about',function(req,res){
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });

});


app.listen(3000,function(){
console.log('load message');

});
