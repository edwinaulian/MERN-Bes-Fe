import React from 'react';
import logo from '../../assets/images/logo.png';
import packages from '../../../package.json';
import './login.css';
import { generalContants, typeMethod } from '../common/constant/general';
var _ = require('lodash');

const TITLE_APPS = 'BES';
class LoginFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: generalContants.EMPTY_ARRAY, errorMessage: generalContants.EMPTY_VALUE, userName: generalContants.EMPTY_VALUE, password: generalContants.EMPTY_VALUE, error: generalContants.NULL_VALUE, isLoaded: false, items: generalContants.EMPTY_ARRAY };

        this.handleDataLoginUserName = this.handleDataLoginUserName.bind(this);
        this.handleDataLoginPass = this.handleDataLoginPass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDataRestBookeXample = this.getDataRestBookeXample.bind(this);
    }

    handleDataLoginUserName(eve) {
        this.setState({ userName: eve.target.value });
    }

    handleDataLoginPass(eve) {
        this.setState({ password: eve.target.value });
    }

    isExsit(obj) {
        return !_.isEmpty(obj) && !_.isUndefined(obj);
    }

    handleSubmit(eve) {
        if (this.isExsit(this.state.userName) && this.isExsit(this.state.password)) {
            this.postDataLogintoServer(eve);
        }
    }

    payloadLogin() {
        const data = generalContants.EMPTY_OBJECT;
        data.userName = this.state.userName;
        data.password = this.state.password;
        return data;
    }

    async getDataRestBookeXample() {
        // GET request using fetch with async/await , headers and try catch
        const headers = new Headers();
        let getDataPost = 'http://localhost:3002/posts';
        fetch(getDataPost, {
            mode: 'no-cors',
            credentials: 'include',
            method: typeMethod.GET,
            headers: headers
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            this.setState({ data: data });
        }).catch(error => {
            this.setState({ errorMessage: error.toString() });
        });
        // const response = await fetch('http://localhost:3002/posts');
        // const data = await response.json();
    }

    postDataLogintoServer(eve) {
        const headers = new Headers();
        let options = ({ headers: this.headers });
        const serviceBaseUrl = 'http://localhost:3003/apiv1/login';
        const reqestOptionPostLogin = {
            mode: 'no-cors',
            credentials: 'include',
            method: typeMethod.POST,
            headers: headers,
            body: JSON.stringify(this.payloadLogin()),
            options,
        }
        fetch(serviceBaseUrl, reqestOptionPostLogin).then(res => res.json()).then((result) => {
            console.log('test', result);
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        });
        eve.preventDefault();
    }

    render() {
        return (
            <div className="container">
                {/* <div id="mms-body-application" className="mms-body-application"> */}
                <div className="main-container">
                    <div className="main-css-login">
                        <img className="logo-app" src={logo} alt="img not found" />
                        <div className="apps-name-login">User Login {TITLE_APPS}</div>
                        <form onSubmit={this.handleSubmit} >
                            <div className='form-group'>
                                <input id="bes-login-username" type="text" name="userName" required="{true}"
                                    value={this.state.userName} onChange={this.handleDataLoginUserName} autoFocus />
                                <label className="label-login" section='userid'>User ID</label>
                            </div>

                            <div className='form-group'>
                                <input id="bes-login-password" type="password" name="password" required="{true}"
                                    value={this.state.password} onChange={this.handleDataLoginPass} autoFocus />
                                <label className="label-login" section='password'>Password</label>
                            </div>
                            <button type="submit" id="btn_login" className="btn bg-flex btn-block">Login</button>
                        </form>

                        <div className="footer-login">
                            <div className="copyright-login">
                                <span onClick={() => window.open("https://www.btpn.com", "_blank")}>BTPN © 2019 - BES {packages.version}</span>
                            </div>
                        </div>

                        {/* <div>
<button type="button" className="btn bg-flex btn-block" onClick={this.getDataRestBookeXample}>GET</button>
</div> */}
                    </div>
                    <div className="main-css-background">
                    </div>
                </div>
                {/* </div> */}
            </div >
        );
    }

}

export default LoginFrame;