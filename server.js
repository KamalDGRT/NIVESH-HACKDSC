const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const secret="HARSH GULATI";

const app = express()
const port = process.env.PORT || 9000

app.use(express.static('News'));
app.use(express.static('Memes'));
app.use(express.static('HomePage'));
app.use(express.static('NIVESH'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())
app.set('view engine', 'ejs');
app.use(express.json())
app.use('/public', express.static('public'));
mongoose.connect(process.env.MONGO_URL || connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const usersch = mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('user', usersch);
usersch.plugin(encrypt, {
    secret: secret,
    encryptedFields:["password"]
}); 
app.get('/login', (req, res) => {
    res.render('login/login');
});
app.get('/blog/fund', (req, res) => {
    res.render('Blog/index');
});
app.post('/login', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;

    User.findOne({
        username: user
    }, (e, matched) => {
        if (matched.password == pass) {
            res.render('HomePage/index');
        } else {
            res.render('login/wrong.ejs')
        }
    });

});
app.post('/signup', (req, res) => {
    const newuser = User({
        username: req.body.username,
        password: req.body.password
    })

    newuser.save((error) => {
        if (!error) {
            res.render('HomePage/index');
        } else {
            console.log(error);
        }
    });

});
app.get('/signup', (req, res) => {
    res.render('login/signup.ejs');
});

app.get('/', (req, res) => {
    res.render('HomePage/index');
});
app.get('/NIVESH/simulator', (req, res) => {
    res.render('NIVESH/simulator');
});

app.get('/Calculator', (req, res) => {
    res.render('Calculators/prac');
});

app.get('/visualisations', (req, res) => {
    res.render('StockForexData/index');
});


app.get('/Calculator1', (req, res) => {
    res.render('Calculators/prac1');
});

app.get('/news', (req, res) => {
    res.render('News/News');
});

app.get('/memes', (req, res) => {
    res.render('Memes/memes');
});

app.post('/api/v1/users/create', (req, res) => {
    try{
        const email = req.body.email
        const password = req.body.password
        const displayName = req.body.displayName
        const user = {email : email,
            displayName : displayName,
            password : password,
            UUID : generateUUID
        }
        
        res.header("Access-Control-Allow-Origin", "*")
        users.create(user, (err, data) => {
            if(err){
                res.status(500).send(err)
            } else {
                res.status(201).send(data)
            }
        })
    } catch(err) {
        console.error(err)
    }
})

app.listen(port, () => console.log(`Listening on localhost:${port}`))
// KuzT7GRWHlmDX2pM