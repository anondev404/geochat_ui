import React from 'react';

import { useNavigate } from 'react-router-dom';

import '../../assets/css/login/login.css';

import appLogo from '../../assets/images/geo_chat.png';


export default Login;
export { LoginRegex };

class LoginRegex {
    static userNameRegexValidation(username) {
        // username is 8-20 characters long
        // no _ or . at the beginning
        // no __ or _. or ._ or .. inside
        // no _ or . at the end
        const regex = new RegExp('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$');
        return regex.test(username);
    }

    static passwordRegexValidation(password) {
        //Minimum eight characters, at least one letter and one number:
        const regex = new RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$');
        return regex.test(password);
    }
}

class LoginComponent extends React.Component {

    constructor(props) {
        //props: (signIn | signUp) & onSubmitHandler(function to handle submit of infromation) 
        super(props);
        //default login is SIGNIN if no signIn or signUp prop is passed
        this.usernameField = React.createRef();
        this.passwordField = React.createRef();
        if (Boolean(props.signIn) ^ Boolean(props.signUp)) {
            if (this.props.signUp) {
                this.confirmPasswordField = React.createRef();
            }
        }
    }

    get nav() {
        return this.props.nav;
    }

    onSubmitButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.props.hasOwnProperty('onSubmitHandler')) {
            console.log('submit button click');
            let username = this.usernameField.current.value;
            let password = this.passwordField.current.value;

            console.table([{
                username: username,
                password: password
            }])

            if (this.props.signIn) {
                this.props.onSubmitHandler(username, password);
            } else {
                let confirmPassword = this.confirmPasswordField.current.value;
                this.props.onSubmitHandler(username, password, confirmPassword);
            }
        } else {
            throw new Error('onSubmitHandler not passed as prop to login component');
        }
    }

    getSubmitField() {
        let loginType;
        let loginTypeOnClick;
        //let loginTypeRoute;
        if (this.props.signIn) {
            loginType = 'Sign Up';
            //TODOloginTypeRoute = '/signUp';
            loginTypeOnClick = (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.nav('/signUp');
            };
        } else {
            loginType = 'Sign In';
            //loginTypeRoute = '/';
            loginTypeOnClick = (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.nav('/');
            };
        }

        let field = (
            <div className="hstack justify-content-between">
                <a href=' ' className="link-dark" onClick={loginTypeOnClick.bind(this)}>{loginType}</a>
                <div className="submit d-flex justify-content-end p-1">
                    <div className="btn btn-dark" onClick={this.onSubmitButtonClick.bind(this)}>submit</div>
                </div>
            </div>
        );
        return field;
    }

    fieldForSignIn() {
        return (
            <>
                <input type="text" className="form-control" ref={this.usernameField} placeholder="username" />
                <input type="password" className="form-control" ref={this.passwordField} placeholder="password" required />
                {this.getSubmitField()}
            </>
        );
    }

    fieldForSignUp() {
        return (
            <>
                <input type="text" className="form-control" ref={this.usernameField} placeholder="username" />
                <input type="password" className="form-control" ref={this.passwordField} placeholder="password" required />
                <input type="password" className="form-control" ref={this.confirmPasswordField} placeholder="confirm password" required />
                {this.getSubmitField()}
            </>
        );
    }


    render() {
        let fields;
        if (this.props.signIn) {
            fields = this.fieldForSignIn();
        } else {
            fields = this.fieldForSignUp();
        }
        let loginSkeleton = (
            <div className="component-login">
                <div className="container">
                    <div className="row justify-content-center d-flex  flex-wrap">
                        <div className="col-10 col-md-5">
                            <div id="geoChatLogo">
                                <img src={appLogo} alt='GeoChat app log' title="Geo Chat" />
                                <span className="appName">
                                    <p>Geo Chat</p>
                                </span>
                            </div>
                            <div className="login-form">
                                <div className="card">
                                    <h5 className="card-header text-muted">Sign Up</h5>
                                    <div className="card-body p-2">
                                        <div className="vstack gap-2">
                                            {fields}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return loginSkeleton;
    }
}


function Login(props) {
    let nav = useNavigate();

    return (<LoginComponent {...props} nav={nav} />)
}
