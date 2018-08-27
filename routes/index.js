var express = require('express'),
	router = express.Router();

module.exports=function(){

	router.get('/', function(req, res, next) {
		if(req.isAuthenticated())
			res.render('manager', {title: 'Dashboard'});
		else
			res.redirect('login');
	});
	router.get('/cart', function(req, res, next) {
		if(req.isAuthenticated())
			res.render('manager', {title: 'Cart'});
		else
			res.redirect('login');
	});
	router.get('/orders', function(req, res, next) {
		if(req.isAuthenticated())
			res.render('manager', {title: 'Order'});
		else
			res.redirect('login');
	});

	router.get('/manager', function(req, res, next) {
		res.render('manager', {title: 'Dashboard'});
	});

	router.get('/register', function(req, res, next) {
		res.render('signup', {title: 'Register'});
	});

	router.get('/login', function(req, res, next) {
		/*if(req.isAuthenticated())
			res.redirect('/');
		else*/
			res.render('manager', {title: 'Login'});
	});


	return router;
}