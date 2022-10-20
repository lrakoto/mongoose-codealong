const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');

// mongo setup
const mongoDb = 'mongodb://127.0.0.1/mongoose-codealong';
const PORT = 8000;
mongoose.connect(mongoDb, {useNewUrlParser: true, useNewUrlParser: true});

const db = mongoose.connection;

// Post.create({content: 'Amazing post...'});

const post = new Post({ title: "Cat", body: "Yeehaw! Sandos!" });

post.comments.push({ header: 'My comment', content: "What!?"  });

post.save((err) => {
    if (!err) console.log('Success!');
});

// Post.findById(post._id, (err, post) => {
//     if (!err) {
//         post.comments.id(subId).remove();
//         post.save(function (err) {
//             // do something
//         });
//         console.log(post);
//     }
// });


// const product = new Product({name: 'Wrench', price: 5});
// product.save();
// const order = new Order({buyer: 'tester', trackingNumber:"ABC123"})
// order.products.push(product)
// order.save();
// fetch orders with products populated
//mongoose.Types.ObjectId("634ae8e793d7c52c0dcc8e05")
// Order.findOne({}, (err, order) => {
//     Order.findById(order._id).populate('products').exec((err, order) => {
//         console.log(order);
//     });
// })
// Order.findById(mongoose.Types.ObjectId("634ae8e793d7c52c0dcc8e05")).populate('products').exec((err, order) => {
//     console.log(order);
// });

db.once('open', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function(err) {
    console.error(`Database error:\n${err}`);
});

//Home Route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our API!'
    })
})

// Users Route
app.get('/users', (req, res) => {
    User.find({})
    .then(users => {
        console.log('All users', users);
        res.json({ users: users });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

// find by email
app.get('/users/:email', (req, res) => {
    console.log('find user by', req.params.email)
    User.findOne({
        email: req.params.email
    })
    .then(user => {
        console.log('Here is the user', user.name);
        res.json({ user: user });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

// Post for create
app.post('/users', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        meta: {
            age: req.body.age,
            website: req.body.website
        }
    })
    .then(user => {
        console.log('New user =>>', user);
        res.json({ user: user });
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

app.put('/users/:email', (req, res) => {
    console.log('route is being on PUT')
    User.findOne({ email: req.params.email })
    .then(foundUser => {
        console.log('User found', foundUser);
        User.findOneAndUpdate({ email: req.params.email }, 
        { 
            name: req.body.name ? req.body.name : foundUser.name,
            email: req.body.email ? req.body.email : foundUser.email,
            meta: {
                age: req.body.age ? req.body.age : foundUser.age,
                website: req.body.website ? req.body.website : foundUser.website
            }
        })
        .then(user => {
            console.log('User was updated', user);
            res.json({ user: user })
        })
        .catch(error => {
            console.log('error', error) 
            res.json({ message: "Error ocurred, please try again" })
        })
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    })
    
});

app.delete('/users/:email', (req, res) => {
    User.findOneAndRemove({ email: req.params.email })
    .then(response => {
        console.log('This was delete', response);
        res.json({ message: `${req.params.email} was deleted`});
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" });
    })
});

// ================ POSTS ROUTES ========================

app.get('/posts', (req, res) => {
    Post.find({})
    .then(posts => {
        console.log('All posts', posts);
        res.json({ posts: posts });
    })
    .catch(error => { 
        console.log('error', error) 
    });
});


// ================ COMMENTS ROUTES ========================

app.get('/comments', (req, res) => {
    Comment.find({})
    .then(comments => {
        console.log('All comments', comments);
        res.json({ comments: comments });
    })
    .catch(error => { 
        console.log('error', error) 
    });
});


// PUT Route for posts 
app.put('/postssers/:email', (req, res) => {
    console.log('route is being on PUT')
    User.findOne({ email: req.params.email })
    .then(foundUser => {
        console.log('User found', foundUser);
        User.findOneAndUpdate({ email: req.params.email }, 
        { 
            name: req.body.name ? req.body.name : foundUser.name,
            email: req.body.email ? req.body.email : foundUser.email,
            meta: {
                age: req.body.age ? req.body.age : foundUser.age,
                website: req.body.website ? req.body.website : foundUser.website
            }
        })
        .then(user => {
            console.log('User was updated', user);
            res.json({ user: user })
        })
        .catch(error => {
            console.log('error', error) 
            res.json({ message: "Error ocurred, please try again" })
        })
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    })
    
});

// create a new user called Chris
// const chris = new User({
//     name: 'Chris',
//     email: 'chris@gmail.com',
//     meta: {
//         age: 27,
//         website: 'http://chris.me'
//     }
// });

// const newUser = User({
//     name: 'bob',
//     email: 'bob@gmail.com'
// });

// save the user
// newUser.save(function(err) {
//     if (err) return console.log(err);
//     console.log('User created!');
// });

// create and save a user
// User.create({ name: 'Emily', email: 'em@i.ly' }, function(err, user) {
//     if (err) return console.log(err);
//     console.log(user);
// });

// express setup
app.use(express.urlencoded({ extended: false }));

// app.get('/', function(req, res) {
//     res.send(chris.sayHello());
// });


// Find All
app.get('/findAll', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.send(err);
        res.send(users);
    });
})
  
  // Find only one user
app.get('/findOne', (req, res) => {
    User.findOne({}, (err, user) => {
        if (err) return res.send(err);
        res.send(user);
      });
})
  
  // Find by email
app.get('/findByEmail/:email', (req, res) => {
    User.find({ email: req.params.email }, (err, user) => {
        if (err) return res.send(err);
        res.send(user);
    });
})

  
  // Find by id
app.get('/findById/:id', (req, res) => {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.send(err);
        res.send(user);
    });
})

app.post('/updateOneByName/:name', (req, res) => {
    User.updateOne({ name: req.params.name }, { meta: { age: 26 } }, (err, user) => {
        if (err) console.log(err);
        console.log(user);
      });
});

app.post('/updateAllByName/:name', (req, res) => {
    User.updateMany({ name: req.params.name }, { meta: { age: 26 } }, (err, user) => {
        if (err) console.log(err);
        console.log(user);
      });
});

app.delete('/deleteByName/:name', (req,res) => {
    User.findOneAndRemove({ name: req.params.name }, function(err) {
        if (err) console.log(err);
        console.log('User deleted!');
    });
})

app.delete('/deleteAllByName/:name', (req,res) => {
    User.remove({ name: req.params.name }, function(err) {
        if (err) console.log(err);
        console.log('Users deleted!');
    });
})
  

app.delete('/posts/:id', (req,res) => {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) console.log(err);
        console.log('Users deleted!');
    })
    .then(response => {
        console.log('This one removed', response)
    })
})

app.post('/posts/:id/comments', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        console.log('This is the post', post);
        //create comment
        post.comments.push({
            header: req.body.header,
            content: req.body.content
        })
        post.save();
        res.redirect(`/posts/${req.params.id}`)
    })
})
  
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
});
