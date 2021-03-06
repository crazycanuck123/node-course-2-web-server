const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port =process.env.PORT || 3000;
var app = express();
var error = false;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});
// if(error === true){
// app.use((req, res, next) =>{
//   var now = new Date().toString();
//   var log = `${now}: ${req.method} ${req.url}`;
//   console.log(log);
//   fs.appendFile('server.log', log + '\n', (err) =>{
//     if(err){
//       console.log('Unable to append to server.log');
//     }
//   });
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance'
//   });
//   next();
// });
// };
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})

app.get('/', (req, res) =>{

  res.render('home.hbs', {
    pageLink: '/',
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to my new Website'
  });
  });


app.get('/about',(req,res)=>{
  res.render('about.hbs', {
    pageLink: '/about.html',
    pageTitle: 'About Page'
  });
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs', {
    pageLink: '/projects.html',
    pageTitle: 'Portfolio Page',
    fillerText: 'Portfolio Page Here'
  });
});

// /bad - send back json with errorMessage

app.get('/bad',(req, res) =>{
  res.send({
    errorMessage: 'Error Processing Request'
  });
});

app.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});
