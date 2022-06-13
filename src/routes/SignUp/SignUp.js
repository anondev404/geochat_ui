import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Login, { LoginRegex } from '../../components/Login/Login.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import serverConfig from './../../server/config/config';
import axios from 'axios';

class SignUpComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            confirmPassword: null,
        };
    }

    get nav() {
        return this.props.nav;
    }


    regexValidator(username, password) {
        let userNameRegex = LoginRegex.passwordRegexValidation(password);
        let passRegex = LoginRegex.userNameRegexValidation(username);

        let message = '';
        if (userNameRegex) {
            message = message + 'username ';
        }
        if (passRegex) {
            message = message + 'password ';
        }

        message = 'entered' + (message) ? message : (message + 'is invalid');
        return message;
    }

    onSubmitHandler(username, password, confirmPassword) {
        console.log('signUp submit handler activated');

        console.log([username, password, confirmPassword])

        if (password === confirmPassword) {
            //TODO send user details to server
            //this.nav('/topic');

            axios.post(`/signUp`, {
                "username": username,
                "password": password
            }).then((res) => {
                const data = res.data;

                toast(data.message);

                setTimeout(() => {
                    if (data.isSuccess) {
                        this.props.nav('/');
                    }
                }, 2000);
            });
        } else {
            //TODO send toast here
            console.log('password and confirm password does not match');

            toast("Password and confirm password does not match");
        }

        /*//TODO: remove nav redirection. nav is out beacuse of testing purposes
        this.nav('/topic');*/
    }

    render() {
        let singUp = (<Login signUp onSubmitHandler={this.onSubmitHandler.bind(this)} />);
        return singUp;
    }

}


function SignUp(props) {
    let nav = useNavigate();

    return (
        <>
            <SignUpComponent {...props} nav={nav} />
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false} />
        </>

    )
}

export default SignUp;