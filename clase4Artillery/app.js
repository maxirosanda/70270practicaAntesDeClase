import express from 'express';

const app = express();

app.get('/operacionsencilla', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    }
    res.send({ sum });
});

app.get('/operacioncompleja', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 5e8; i++) {
        sum += i;
    }
    res.send({ sum });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

