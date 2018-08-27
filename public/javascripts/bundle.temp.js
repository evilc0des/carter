'use strict';

var email = document.getElementById('email-field');
var pass = document.getElementById('password-field');

if (email) {
	email.addEventListener("input", function (event) {
		if (email.validity.typeMismatch) {
			email.setCustomValidity("Enter a valid email adress");
		} else {
			email.setCustomValidity("");
		}
	});
}
if (pass) {
	pass.addEventListener("input", function (event) {
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

var register = function register() {
	var em = email.value,
	    pw = pass.value;

	axios.post('/auth/signup', {
		email: em,
		password: pw
	}).then(function (response) {
		console.log(response);
	}).catch(function (err) {
		console.log(err);
	});
};

var login = function login() {
	var em = email.value,
	    pw = pass.value;

	axios.post('/auth/login', {
		email: em,
		password: pw
	}).then(function (response) {
		console.log(response);
	}).catch(function (err) {
		console.log(err);
	});
};
'use strict';

var sidebar = document.getElementById('sidebar-open');
var toggleSideBar = function toggleSideBar() {
	sidebar.classList.toggle('active');
};

module.exports = {
	toggleSideBar: toggleSideBar
};
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  'h1',
  { style: { color: 'white' } },
  'Test Content try'
), document.getElementById('root'));
//# sourceMappingURL=bundle.temp.js.map
