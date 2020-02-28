const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

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

const database = {
    users : [
        {
            id : '123',
            name : 'Admin',
            email : 'user@example.com',
            password : 'user123',
            entries : 0,
            joined : new Date()
        },
        {
            id : '124',
            name : 'user2',
            email : 'user2@example.com',
            password : 'user124',
            entries : 0,
            joined : new Date()
        }
    ]
}

app.get('/',(req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    const {email, password} = req.body;
    if(email === database.users[0].email && password === database.users[0].password){
        res.json(database.users[0]);
    } else{
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const {email, password, name} = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash : hash,
            email : email
        }).into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert(
                    {
                        name : name,
                        email : loginEmail[0],
                        joined : new Date()
                    }
                )
            .then(user => res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
     .catch(err => res.status(400).json('Unable to register'));
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.lenght){
            res.json(user[0]);
        } else{
            res.status(400).json('Not found');
        }
    })
    .catch(err => res.json('Error getting this profile'));
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => res.json(entries[0]))
      .catch(res.status(400).json('Unable to get entries'));
})

app.listen(3000);