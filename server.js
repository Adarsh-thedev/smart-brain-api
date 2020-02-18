const express = require('express');

const app = express();

app.use(express.json());

const database = {
    users : [
        {
            id : '123',
            name : 'user',
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
        res.json('Success');
    } else{
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const {email, password, name} = req.body;
    database.users.push(
        {
            id : '125',
            name : name,
            email : email,
            password : password,
            entries : 0,
            joined : new Date()
        }
    );
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if(!found) {
        res.status(400).json('No such user');
    }
})

app.listen(3000);