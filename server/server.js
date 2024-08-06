const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/registration', (req, res) => {
  res.json({ message: 'GET request received' });
});

app.post('/registration', (req, res) => {
  const data = req.body;
  res.json({ message: 'POST request received', data });
})

app.use(express.static('../dist'))

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: '../dist' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
