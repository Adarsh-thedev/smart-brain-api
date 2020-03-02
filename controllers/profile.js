const getProfile =(req, res, db) => {
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
}

module.exports = {
    getProfile
}

