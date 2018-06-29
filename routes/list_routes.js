// note_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/cards', (req, res) => {
        db.collection('cards').find().toArray(function(e, d) {
            res.setHeader('Access-Control-Allow-Origin', '*');

            res.send(d)
        });
    });


    app.delete('/cards/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('cards').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    app.post('/cards', (req, res) => {
        const list = { title: req.body.title, desc: req.body.desc };
        db.collection('cards').insert(list, (err, result) => {
            if (err) {
                res.send({ 'error': err });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};