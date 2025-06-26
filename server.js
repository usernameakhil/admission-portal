const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

let submissions = []; // Temporary in-memory storage

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to display form
app.get('/admission', (req, res) => {
  res.render('form');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { fullName, email, phone, course } = req.body;
  submissions.push({ fullName, email, phone, course });

  res.render('success', { fullName, course });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/admission`);
});
