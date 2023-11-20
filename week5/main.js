// Arrows function
arrowFunc1 = (x, y) => {
	return x + y;
};
console.log(arrowFunc1(2, 3));

// JS objects
const product = {
	Name: 'Product1',
	Price: 100.0,
	Quantity: 10,
	toString: function () {
		return `${this.Name} (${this.Price})`;
	},
};
console.log(`Product: ${product.Name} (${product['Price']})`);
console.log(product.toString());

