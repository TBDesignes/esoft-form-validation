import { checker } from './form_checker.js';

const _button_submit = document.getElementById('btn-submit');
const _user = document.getElementById('user');
const _username = document.getElementById('username');
const _password = document.getElementById('password');
const _password_repeat = document.getElementById('password-repeat');
const _agreement = document.getElementById('agreement');

const _user_hint = document.getElementById('user-hint')
const _username_hint = document.getElementById('username-hint')
const _password_hint = document.getElementById('password-hint')
const _password_repeat_hint = document.getElementById('password-repeat-hint')
const _agreement_hint = document.getElementById('agreement-hint');


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


const user_checker =
    checker({
        type: 'string',
        pattern: /^\D+$/
    }).onSuccess(() => {
        _user.setCustomValidity('');
        _user_hint.hidden = true;
    }).onFail(() => {
        _user.setCustomValidity('Неправильные данные');
        _user_hint.hidden = false;
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

const agreement_checker =
    checker({
        type: 'boolean',
    }).afterValidation(data => {
        return data;
    }).onSuccess(() => {
        _agreement.setCustomValidity('');
        _agreement_hint.hidden = true;
    }).onFail(() => {
        _agreement.setCustomValidity('Неправильные данные');
        _agreement_hint.hidden = false;
    });

const password_repeat_checker =
    checker({
        type: 'string',
        minLength: 1
    }).afterValidation(data => {
        return data === _password.value;
    }).onSuccess(() => {
        _password_repeat.setCustomValidity('');
        _password_repeat_hint.hidden = true;
    }).onFail(() => {
        _password_repeat.setCustomValidity('Пароли не совпадают');
        _password_repeat_hint.hidden = false;
    });


function validate() {
    const userdata = {
        user: _user.value,
        username: _username.value,
        password: _password.value,
        password_repeat: _password_repeat.value,
        agreement: _agreement.checked
    }
    user_checker.run(userdata.user);
    username_checker.run(userdata.username);
    password_checker.run(userdata.password);
    password_repeat_checker.run(userdata.password_repeat);
    agreement_checker.run(userdata.agreement);

    if (user_checker.succeed &&
        username_checker.succeed &&
        password_checker.succeed &&
        agreement_checker.succeed &&
        password_repeat_checker.succeed) {
        console.log(userdata);
    }
}

_button_submit.addEventListener('click', () => validate());
_user.addEventListener('focusout', e => user_checker.run(e.target.value))
_username.addEventListener('focusout', e => username_checker.run(e.target.value))
_password.addEventListener('focusout', e => password_checker.run(e.target.value))
_password_repeat.addEventListener('focusout', e => password_repeat_checker.run(e.target.value))