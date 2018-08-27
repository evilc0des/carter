function Config() {
  this.port = '4000';
  this.dbUrl = 'mongodb://carterapp:cartermlab@ds135747.mlab.com:35747/carter';
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
        user: 'apikey', // generated ethereal user
        pass: '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'  // generated ethereal password
    }
  }
}

module.exports = new Config();
