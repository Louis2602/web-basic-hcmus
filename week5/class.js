class Fraction {
	constructor(numerator, denominator) {
		this.numerator = numerator;
		this.denominator = denominator;
	}
	Plus(fOther) {
		let rD = this.denominator * fOther.denominator;
		let rN =
			this.numerator * fOther.denominator +
			this.denominator * fOther.numerator;
		return new Fraction(rN, rD);
	}
	Minus(fOther) {
		// implement code
		return new Fraction(rN, rD);
	}
}

let f1 = new Fraction(3, 5);
let f2 = new Fraction(7, 11);
console.log(f1.Plus(f2));
