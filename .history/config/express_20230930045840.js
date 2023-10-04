var config = require('config'),
express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
session = require('express-session');

module.exports = function () {
var app = express();
if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));

} else if (process.env.NODE_ENV === 'production') {
app.use(compress());
}

app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
  // Define your session secret here (replace 'your-secret-key-here' with your actual secret key)
  //const sessionSecret = 'your-secret-key-here';
  const sessionSecret='developmentSessionSecret';
app.use(session({
saveUninitialized: true,
resave: true,
secret: config.sessionSecret
}));
app.set('views', './app/views'),
app.set('view engine', 'ejs');
 // Example route for demonstration
  //app.get('/', (req, res) => {
    //res.render('index'); // Replace 'index' with the name of your template
    //});
    
    //require('../app/routes/index.server.routes.js')(app);

  // Serve static files from the 'public' directoryapp.use(express.static('./public'));

return app;
};