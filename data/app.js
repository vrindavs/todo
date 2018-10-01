const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const cors = require('cors');


// Create server
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 50000 }));


// Create database instance and start server
const adapter = new FileAsync('db.json')
low(adapter)
    .then(db => {
        // Routes
        // GET /task/:id
        app.get('/task/:id', (req, res) => {
                const post = db.get('posts')
                    .find({ id: req.params.id })
                    .value()

                res.send(post)
            })
            // Get /allTasks
        app.get('/allTasks', (req, res) => {
            const post = db.get('posts')
                .value()
            res.send(post)
        })


        // POST /addTasks
        app.post('/addTask', (req, res) => {
            console.log(req.body)
            db.get('posts')
                .push(req.body)
                .last()
                .assign({ id: Date.now().toString() })
                .write()
                .then(post => res.send(post))
        })

        // PUT /editTasks
        app.put('/editTask', (req, res) => {
            console.log(req.body)
            db.get('posts')
                .find({ id: req.body.id })
                .assign({ status: req.body.status })
                .write()
                .then(post => res.send(post))
        })


        // Set db default values
        return db.defaults({ posts: [] }).write()
    })
    .then(() => {
        app.listen(3000, () => console.log('listening on port 3000'))
    })
