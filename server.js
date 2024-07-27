
/*********************************************************************************
*  WEB700 – Assignment 05
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Meet Mangukiya Student ID: 147162234 Date: 7/26/2024
*
*  Online (vercel) Link: 
********************************************************************************/ 



const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const data = require('./modules/collegeData.js');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;


app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/htmlDemo', (req, res) => {
  res.render('htmlDemo');
});

app.get('/students', (req, res) => {
  if (req.query.course) {
    data.getStudentsByCourse(req.query.course).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json({ message: 'no results' });
    });
  } else {
    data.getAllStudents().then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json({ message: 'no results' });
    });
  }
});

app.get('/students/add', (req, res) => {
  res.render('addStudent');
});

app.post('/students/add', (req, res) => {
  data.addStudent(req.body).then(() => {
    res.redirect('/students');
  });
});

app.get('/student/:studentNum', (req, res) => {
  data.getStudentByNum(req.params.studentNum).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({ message: 'no results' });
  });
});

app.get('/tas', (req, res) => {
  data.getTAs().then((data) => {
    res.json(data);
  });
});

app.get('/courses', (req, res) => {
  data.getCourses().then((data) => {
    res.json(data);
  });
});


app.use((req, res) => {
  res.status(404).send('Page Not Found');
});


data.initialize().then(() => {
  app.listen(HTTP_PORT, () => {
    console.log('Server listening on port: ' + HTTP_PORT);
  });
}).catch((err) => {
  console.log('Unable to start server: ' + err);
});

module.exports = app;
