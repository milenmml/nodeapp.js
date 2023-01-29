const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB Replica Set
mmongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    replicaSet: process.env.MONGO_REPLICA_SET,
    poolSize: process.env.MONGO_POOL_SIZE,
    autoReconnect: process.env.MONGO_AUTO_RECONNECT,
    reconnectTries: process.env.MONGO_RECONNECT_TRIES,
    reconnectInterval: process.env.MONGO_RECONNECT_INTERVAL,
    bufferMaxEntries: process.env.MONGO_BUFFER_MAX_ENTRIES
})

.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
    Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
