//server.js


// BASE SETUP
// ============================================================================

//call the packages we need
var express    = require('express');        //call express
var app        = express();                 //define our app using express
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); //connect to our database

var Bear       = require('./app/models/bear');

//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        //set our port

// ROUTS FOR OUR API
// ============================================================================
var router = express.Router();              //get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next){
    //do logging
    console.log('Something is happening.');
    next(); //make sure we go to the next routes and don't stop here
});

//test route to make sure everything is working (accessed at GET http://localhost:8080/api
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

//more routs for our API will happen here

// on routes that end in /bears
// ----------------------------------------------
router.route('/bear')

    //create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var bear = new Bear();      //create a new instance of the Bear model
        bear.name = req.body.name;  //set the bear's name (comes from the request)
		
		
		console.log('got here');
		
        //save the bear and check for errors
        bear.save(function(err){
            if(err){
				res.send(err);}

            res.json({message: 'Bear created!' });
        });
    });

// REGISTER OUR ROUTES --------------------------
// all of our routs will be prefixed with /api
app.use('/api', router);

//START THE SERVER
// ============================================================================
app.listen(port);
console.log('Magic happens on port '+port);