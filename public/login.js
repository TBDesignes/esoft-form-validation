import { checker } from './form_checker.js';

const _button_submit = document.getElementById('btn-submit');
const _username = document.getElementById('username');
const _password = document.getElementById('password');

const _username_hint = document.getElementById('username-hint')
const _password_hint = document.getElementById('password-hint')


const username_checker =
    checker({
        type: 'string',
        format: 'email',
    }).onSuccess(() => {
        _username.setCustomValidity('');
        _username_hint.hidden = true;
    }).onFail(() => {
        _username.setCustomValidity('Неправильные данные');
        _username_hint.hidden = false;
    });

const password_checker =
    checker({
        type: 'string',
        minLength: 8
    }).onSuccess(() => {
        _password.setCustomValidity('');
        _password_hint.hidden = true;
    }).onFail(() => {
        _password.setCustomValidity('Неправильные данные');
        _password_hint.hidden = false;
    });

function validate() {
    const userdata = {
        username: _username.value,
        password: _password.value
    }
    username_checker.run(userdata.username);
    password_checker.run(userdata.password);
    if (username_checker.succeed && password_checker.succeed) {
        console.log(userdata);
    }
}

_button_submit.addEventListener('click', () => validate());
_username.addEventListener('focusout', e => username_checker.run(e.target.value))
_password.addEventListener('focusout', e => password_checker.run(e.target.value))