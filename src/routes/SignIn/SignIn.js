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
        /*let regexMsg = this.regexValidator(username, password);
        if (Boolean(regexMsg)) {
            //TODO send toast here
            console.log(regexMsg);
        }*/

        axios.post(`/signIn`, {
            "username": username,
            "password": password,
            "location": {
                "coordinate": {
                    "lat": 22.3700471614417,
                    "lon": 87.31945294244507
                }
            }
        }, {
            withCredentials: true
        }).then((res) => {
            const data = res.data;

            toast(data.message);

            setTimeout(() => {
                if (data.isSuccess) {
                    this.nav('/topic');
                }
                console.log(res);
            }, '2000');

        });
        /*
        //TODO: remove nav redirection. nav is out beacuse of testing purposes
        this.nav('/topic');*/
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