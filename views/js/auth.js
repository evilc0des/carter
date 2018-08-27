
const email = document.getElementById('email-field');
const pass = document.getElementById('password-field');

if(email)
{
	email.addEventListener("input", (event) => {
		if (email.validity.typeMismatch) {
			email.setCustomValidity("Enter a valid email adress");
		} else {
			email.setCustomValidity("");
		}
	});
}
if(pass){
	pass.addEventListener("input", (event) => {
		if (pass.validity.tooShort && pass.validity.patternMismatch) {
			pass.setCustomValidity("1. The Password must be atleast 8 character long.       \n2.The Password must contain atleast one letter, one number and one special character.");
		} else if (pass.validity.patternMismatch) {
			pass.setCustomValidity("The Password must contain atleast one letter, one number and one special character.");
		} else if (pass.validity.tooShort) {
			pass.setCustomValidity("The Password must be atleast 8 character long.");
		} else {
			pass.setCustomValidity("");
		}
	});
}
	

const register = () => {
	let em = email.value, pw = pass.value;

	axios.post('/auth/signup', {
		email: em,
		password: pw
	}).then((response) => {
		console.log(response);
	}).catch((err) => {
		console.log(err);
	});
}

const login = () => {
	let em = email.value, pw = pass.value;

	axios.post('/auth/login', {
		email: em,
		password: pw
	}).then((response) => {
		if(response.data.s === 'p')
			window.location = '/manager';
	}).catch((err) => {
		console.log(err);
	});
}