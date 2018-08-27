var express = require('express'),
	router = express.Router();
const Store = require('../../model/store');
const Product = require('../../model/product');

module.exports=function(){

	router.post('/add', (req, res) => {
		const { products } = req.body;

		Product.insertMany(products, function(err) {
			if(err) return err;
			res.json({s: 'p'});
		});
	});

	router.get('/add', () => {
		res.json({s: 'p'});
	});

	router.get('/list', (req, res) => {

		Product.find({}, function(err, products){
            if(err)
				return err;
			else if(!products) {
				res.json({s: 'f'});
			}
            else if(products){
                res.json({s: 'p', products: products});
            }
        });

		/*const productArr = [
			{
				_id: 100,
				title: "Harry Potter",
				stock: 45
			},
			{
				_id: 200,
				title: "Gray Tshirt",
				variant: [
					"S", "M", "L", "XL"
				],
				variant_count: [
					10, 20, 4, 6
				],
				stock: 40
			},
			{
				_id: 300,
				title: "Hunger Games",
				stock: 35
			},
			{
				_id: 400,
				title: "Divergence",
				stock: 45
			}
		]*/

		//res.json({s: 'p', products: productArr});
	});


	return router;
}