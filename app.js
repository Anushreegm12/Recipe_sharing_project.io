const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Import the routes for recipes (and any other page routes)
const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

// New route for contact page
app.get('/contact', (req, res) => {
  res.render('contact', {
    successMessage: req.flash('success'),
    errorMessage: req.flash('error')
  });
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { fullName, email, phone, message } = req.body;

  // Basic validation
  if (!fullName || !email || !message) {
    req.flash('error', 'Please fill in all required fields.');
    return res.redirect('/contact');
  }

  // Simulating a success response (you can integrate an email service like nodemailer here)
  req.flash('success', 'Your message has been sent successfully!');
  res.redirect('/contact');
});

app.listen(port, () => console.log(`Listening on port ${port}`));


