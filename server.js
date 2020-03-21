const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'adarsh',
    password : 'Adarsh111',
    database : 'smart-brain'
  }
});

//db.select('*').from('users').then(data => console.log(data));

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req, res) => {
    res.send(database.users);
})

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));
//dependency injection

app.get('/profile/:id', (req, res) => {profile.getProfile(req, res, db)});

app.put('/image', (req, res) => {image.increaseEntries(req, res, db)});

//app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(3000);