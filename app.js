var express = require('express');
var session = require('client-sessions');
var stormpath = require('express-stormpath');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: 'D:/Course Files/Stormpath API Key/apiKey-2IE9VAT1A1UHMSHUE6I1C3WBA.properties',
  application: 'https://api.stormpath.com/v1/applications/39FeUYtUIA3x8o89uWzbQf',
  secretKey: 'test123',
  expandCustomData: true,
  enableForgotPassword: true
});

var sessionMiddleware = session({
  cookieName: 'session',
  secret: 'blahblah',
  duration: 24 * 60 * 60 * 1000  // make sessions last for 1 day (in milliseconds)
});

app.use(sessionMiddleware);
app.use(stormpathMiddleware);
app.use('/profile',require('./profile')());

app.use(stormpath.init(app, {
  enableFacebook: true,
  social: {
    facebook: {
      appId: '1430925370543294',
      appSecret: '81672f79c04f274652a627d84ccca0fc',
    },
  },
}));

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});

app.listen(3000);
