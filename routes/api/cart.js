var express = require('express'),
	router = express.Router();
const Store = require('../../model/store');
const Product = require('../../model/product');
const Cart = require('../../model/cart');

module.exports=function(){

	router.post('/add', (req, res) => {
		const { product: productId, qty, variant } = req.body;
		//console.log(store);
        //console.log(items);
        
        Product.findById( productId, function(err, product){
            if(err)
                return err;
            else if(!product){
                res.json({s: 'f'});
            }
            else {
                Cart.findOne({owner: req.user.id}, function(err, cart){
                    if(err)
                        return err;
                    else if(!cart) {
                        let newCart = new Cart({
                            owner: req.user.id,
                            products: []
                        });
                        newCart.products.push({
                            product: productId,
                            quantity: qty,
                            variant: variant
                        });
                        newCart.save((err) => {
                            if(err) return err;
                            res.json({s: 'p'});
                        })
                    }
                    else if(cart){
                        let updated = false;
                        let productArr = cart.products.map(product => {
                                if(product.product == productId && product.variant === variant){
                                    updated = true;
                                    return {...product, quantity: parseInt(product.quantity) + parseInt(qty)}
                                }
                                else return product;
                        });
                        
                        cart.products = updated ? productArr : [...cart.products, {
                            product: productId,
                            quantity: qty,
                            variant: variant
                        }];
                        cart.save((err) => {
                            if(err) return err;
                            res.json({s: 'p'});
                        })
                    }
                });
            }
                
            
        });
	});

	router.post('/update', (req, res) => {
        console.log(req.body);
        Cart.findOne({owner: req.user.id}, function(err, cart){
            if(err)
                return err;
            else if(!cart) {
                res.json({s: 'p', d: []});
            }
            else if(cart){
                cart.products = cart.products.map(product => {
                    for(const p of req.body.products){
                        if(product.product == p._id && product.variant == p.variant){
                            return {
                                product: p._id, variant: p.variant, quantity: p.qty
                            }
                        }
                    }
                    return product;
                });
                cart.save((err, savedCart) => {
                    if(err) return err;
                    res.json({s: 'p', d: savedCart.products});
                });
            }
        });
        
	});

	router.get('/list', (req, res) => {

		Cart.findOne({owner: req.user.id}, function(err, cart){
            if(err)
                return err;
            else if(!cart) {
                res.json({s: 'p', d: []});
            }
            else if(cart){
                res.json({s: 'p', d: cart.products});
            }
        });
	});


	return router;
}