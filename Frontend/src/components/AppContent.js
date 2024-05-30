import * as React from 'react';

import { request, setAuthHeader } from '../services/axios';

import LoginForm from './LoginForm';
import EnteranceContent from './EnteranceContent';
import CodePanel from './CodePanel';

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authCode: "1",
            userCode: "2",
            userId: -1,
            errorMessage: "",
            componentToShow: ["enterance", "buttonLogin"],
            tempUsername: "",
            tempPassword: "",
            registerData: null,
        }
    };

    submit = (code) => {
        this.setState({ userCode: code }, () => {
            if (this.state.userCode == this.state.authCode) {
                if (this.state.registerData) {
                    const { firstName, lastName, username, password, email } = this.state.registerData;
                    this.registerRequest(firstName, lastName, username, password, email);
                } else {
                    this.loginRequest(this.state.tempUsername, this.state.tempPassword);
                }
            } else {
                this.setState({ errorMessage: "Invalid verification code." });
                this.errorMessage = "Invalid verification code.";
            }
        });
    }

    login = () => {
        this.setState({ componentToShow: ["login"] });
    };

    logout = () => {
        this.setState({ componentToShow: ["enterance", "buttonLogin"] });
        setAuthHeader(null);
    };

    loginRequest = (username, password) => {
        request(
            "POST",
            "/user/login",
            {
                username: username,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({ userId: response.data.id });
                window.location.href = "/main";
                this.errorMessage = "";
            }).catch(
            (error) => {
                setAuthHeader(null);

                this.setState({ errorMessage: error.response.data.message });
                this.errorMessage = error.response.data.message;
            }
        );
    }

    registerRequest = (firstName, lastName, username, password, email) => {
        request(
            "POST",
            "/user/register",
            {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                email: email
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({ userId: response.data.id });
                window.location.href = "/main";
                this.errorMessage = "";
            }).catch(
            (error) => {
                setAuthHeader(null);
                
                this.setState({ errorMessage: error.response.data.message });
                this.errorMessage = error.response.data.message;
            }
        );
    }

    sendCode = (username, email) => {
        const randomCode = Math.floor(Math.random() * (9001)) + 1000;
        this.setState({ authCode: randomCode });
        const secureCode = (randomCode*(15)+23)*610;
        request(
            "POST",
            "/user/sendCode",
            {
                username: username,
                code: secureCode,
                email: email
            }).catch(
            (error) => {
                this.setState({ errorMessage: error.response.data.message });
                this.errorMessage = error.response.data.message;
            }
        );
    }

    onLogin = (event, username, password) => {
        event.preventDefault();
        this.setState({ tempUsername: username, tempPassword: password }, () => {
            this.sendCode(username, null);
            this.setState({ componentToShow: ["login", "code"] });
        });
    };

    onRegister = (event, firstName, lastName, username, password, email) => {
        event.preventDefault();
        this.setState({ registerData: { firstName, lastName, username, password, email } }, () => {
            this.sendCode(username, email);
            this.setState({ componentToShow: ["login", "code"] });
        });
    };

    render() {
        const { componentToShow } = this.state;

        return (
            <>
            <div>
                {this.errorMessage && <p style={{ color: 'red', marginTop: '20px' }}>{this.errorMessage}</p>}
                {componentToShow.includes("code") && <CodePanel submit={this.submit} />}
                {componentToShow.includes("login") && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
                {componentToShow.includes("enterance") && <EnteranceContent login={this.login}/>}
            </div>
            </>
        );
    }
}
