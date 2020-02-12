const express = require('express');

const app = express();

app.use(express.json());

app.get('/',(req, res) => {
    res.send('Working');
})

app.post('/signin', (req, res) => {
    res.json('Signin');
})

app.listen(3000);