import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Login, { LoginRegex } from '../../components/Login/Login.js'
import axios from 'axios';
import serverConfig from './../../server/config/config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignInComponent extends React.Component {

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

    onSubmitHandler(username, password) {
        console.log('signUp submit handler activated');

        const signInSuccess = (res) => {
            const data = res.data;
            toast(data.message);
            setTimeout(() => {
                if (data.isSuccess) {
                    this.nav('/topic');
                }
                console.log(res);
            }, '2000');
        };

        const reqPayload = (coords) => {
            console.log(coords);
            return {
                "username": username,
                "password": password,
                "location": {
                    "coordinate": {
                        "lat": coords.latitude,
                        "lon": coords.longitude
                    }
                }
            };
        };

        const geoLocationNotFound = (err) => { }

        toast('Fetching Location...');

        navigator.geolocation.getCurrentPosition((pos) => {
            toast('Signing in...');

            axios.post(`/signIn`,
                reqPayload(pos.coords), {
                withCredentials: true
            }).then(signInSuccess).catch(err => {
                toast(err.message);
            });

        }, geoLocationNotFound, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });


    }

    render() {
        let singUp = (<Login signIn onSubmitHandler={this.onSubmitHandler.bind(this)} />);
        return singUp;
    }

}


function SignIn(props) {
    let nav = useNavigate();

    return (
        <>
            <SignInComponent {...props} nav={nav} />
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

export default SignIn;