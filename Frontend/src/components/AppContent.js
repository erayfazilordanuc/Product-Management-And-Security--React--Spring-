import * as React from 'react';

import {request, setAuthHeader} from '../services/axios';

import ButtonLogin from './ButtonLogin';
import LoginForm from './LoginForm';
import EnteranceContent from './EnteranceContent';

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId:-1,
            errorMessage: "t",
            componentToShow: ["enterance", "buttonLogin"] // Default olarak "enterance" bileşeni gösterilir
        }
    };

    login = () => {
        this.setState({componentToShow: ["login"]});
    };

    logout = () => {
        this.setState({componentToShow: ["enterance", "buttonLogin"]});
        setAuthHeader(null);
    };

    onLogin = (event, username, password) => {
        event.preventDefault();
        request(
            "POST",
            "/auth/login",
            {
                username: username,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({userId: response.data.id});
                window.location.href="/main";
                this.errorMessage = "";
                // alert("Login successful!");
            }).catch(
            (error) => {
                setAuthHeader(null);

                this.setState({errorMessage: error.response.data.message});
                this.errorMessage = error.response.data.message;
            }
        );
    };

    onRegister = (event, firstName, lastName, username, password) => {
        event.preventDefault();
        request(
            "POST",
            "/auth/register",
            {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({userId: response.data.id});
                window.location.href="/main";
                this.errorMessage = "";
                // alert("Registeration successful!");
            }).catch(
            (error) => {
                setAuthHeader(null);
                
                this.setState({errorMessage: error.response.data.message});
                this.errorMessage = error.response.data.message;
            }
        );
    };

    render() {
        const { componentToShow } = this.state;

        return (
            <>
                {/* <h1 style={{ color: 'red' }}>{this.errorMessage}</h1> */}
                {this.errorMessage && <p style={{ color: 'red', marginTop: '20px'}}>{this.errorMessage}</p>}

                {componentToShow.includes("buttonLogin") && <ButtonLogin login={this.login}/>}
                {componentToShow.includes("login") && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
                {componentToShow.includes("enterance") && <EnteranceContent />}
            </>
        );
    }
}
