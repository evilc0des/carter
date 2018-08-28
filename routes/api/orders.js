var express = require('express'),
	router = express.Router();
const Store = require('../../model/store');
const Product = require('../../model/product');
const Cart = require('../../model/cart');
const Order = require('../../model/order');
const mongoose = require('mongoose');

module.exports=function(){

	router.post('/create', (req, res) => {
		const { items } = req.body;
		//console.log(store);
		Cart.findOne({owner: req.user.id}).populate('products.product').exec(function(err, cart){
			if(err) return err;
			else if(!cart) {
				res.json({s: 'f', d: 'cart_empty'});
			}
			else if(cart) {
				if(cart.products.length == 0){
					res.json({s: 'f', d: 'cart_empty'});
				}
				else {
					let total = 0, quantity = 0;

					let productArr = cart.products.map(product => {
						total += product.product.price * product.quantity;
						quantity += product.quantity;
						return {
							product: product.product._id,
							quantity: product.quantity,
							variant: product.variant
						}
					});

					Order.create({ 
						customer: req.user.id,
						total: total,
						quantity: quantity,
						products: productArr,
						createdDate: Date.now()
					}, function (err, order) {
						if (err) return handleError(err);
						// saved!
						cart.products = [];
						cart.save(err => {
							if(err) return err;
							res.json({s: 'p', d: order});
						});
					});
				}
			}
		});

		
		//res.json({s: 'p', d: {_id: 213, total: 500}});
	});

	router.post('/delete', (req, res) => {
		Order.remove({ _id: mongoose.Types.ObjectId(req.body.orderID)}, (err) => {
			if(err)
				throw err;
			else {
				res.json({s: 'p'});
			}
		});
	});

	router.get('/list', (req, res) => {

		Order.find({customer: req.user.id}, function(err, orders){
            if(err)
                return err;
            else if(!orders || orders.length == 0) {
                res.json({s: 'p', d: []});
            }
            else {
                res.json({s: 'p', d: orders});
            }
        });

		//res.json({s: 'p', products: productArr});
	});


	return router;
}