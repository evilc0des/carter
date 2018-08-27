function Config() {
  this.port = '4000';
  this.dbUrl = '';
  this.auth = {
  	'facebookAuth' : {
        'clientID': '', // App ID
        'clientSecret': '', // your App Secret
        'callbackURL': 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.11/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey': '',
        'consumerSecret': '',
        'callbackURL': 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID': 'your-secret-clientID-here',
        'clientSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:8080/auth/google/callback'
    }
  }
  this.mailTransportOptions = {
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: '', // generated ethereal user
        pass: ''  // generated ethereal password
    }
  }
}

module.exports = new Config();