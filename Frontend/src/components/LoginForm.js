// import * as React from 'react';
// import classNames from 'classnames';

// export default class LoginForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             active: "login",
//             firstName: "",
//             lastName: "",
//             username: "",
//             password: "",
//             onLogin: props.onLogin,
//             onRegister: props.onRegister
//         };
//     };

//     onChangeHandler = (event) => {
//         let name = event.target.name;
//         let value = event.target.value;
//         this.setState({[name] : value});
//     };

//     onSubmitLogin = (e) => {
//       e.preventDefault();
//       const { username, password } = this.state;
//       if (!username || !password) {
//           alert("Please enter both username and password");
//           return;
//       }
//       this.state.onLogin(e, username, password);
//     };
  
//     onSubmitRegister = (e) => {
//       e.preventDefault();
//       const { firstName, lastName, username, password } = this.state;
//       if (!firstName || !lastName || !username || !password) {
//           alert("Please fill in all fields");
//           return;
//       }
//       this.state.onRegister(e, firstName, lastName, username, password);
//     };  

//     backHome = () => {
//       window.location.reload();
//     }

//     render() {
//         return (
//         <div className="container">
//             <div className="col-12">
//             <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
//               <li className="nav-item" role="presentation">
//                 <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")} id="tab-login"
//                   onClick={() => this.setState({active: "login"})}>Login</button>
//               </li>
//               <li className="nav-item" role="presentation">
//                 <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")} id="tab-register"
//                   onClick={() => this.setState({active: "register"})}>Register</button>
//               </li>
//             </ul> 

//             <div className="tab-content">
//               <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")} id="pills-login" >
//                 <form onSubmit={this.onSubmitLogin}>

//                   <div className="form-outline mb-4">
//                     <label className="form-label" htmlFor="username">Username</label>
//                     <input type="login" id="username" name= "username" className="form-control" onChange={this.onChangeHandler}/>
//                   </div>

//                   <div className="form-outline mb-4">
//                     <label className="form-label" htmlFor="loginPassword">Password</label>
//                     <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
//                   </div>

//                   <button type="submit" className="btn btn-success btn-block mb-2">Sign in</button>

//                 </form>
//               </div>
//               <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")} id="pills-register" >
//                 <form onSubmit={this.onSubmitRegister}>

//                   <div className="form-outline mb-4">
//                     <label className="form-label" htmlFor="firstName">First name</label>
//                     <input type="text" id="firstName" name="firstName" className="form-control" onChange={this.onChangeHandler}/>
//                   </div>

//                   <div className="form-outline mb-4">
//                     <label className="form-label" htmlFor="lastName">Last name</label>
//                     <input type="text" id="lastName" name="lastName" className="form-control" onChange={this.onChangeHandler}/>
//                   </div>

//                   <div className="form-outline mb-4">
//                     <label className="form-label" htmlFor="username">Username</label>
//                     <input type="text" id="username" name="username" className="form-control" onChange={this.onChangeHandler}/>
//                   </div>

//                   <div className="form-outline mb-4">
//                     <label className="form-label" htmlFor="registerPassword">Password</label>
//                     <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
//                   </div>

//                   <button type="submit" className="btn btn-success btn-block mb-2">Sign in</button>
//                 </form>
//               </div>
//             </div>
//             <button type="submit" className="btn btn-danger btn-block mb-1" onClick={this.backHome}>Back</button>
//             </div>
//         </div>
//         );
//     };
// }

import * as React from 'react';
import classNames from 'classnames';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            email: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister
        };
    };

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name] : value});
    };

    onSubmitLogin = (e) => {
      e.preventDefault();
      const { username, password} = this.state;
      if (!username || !password) {
          alert("Please enter both username and password");
          return;
      }
      this.state.onLogin(e, username, password);
    };
  
    onSubmitRegister = (e) => {
      e.preventDefault();
      const { firstName, lastName, username, password, email } = this.state;
      if (!firstName || !lastName || !username || !password || !email) {
          alert("Please fill in all fields");
          return;
      }
      if(!email.includes("@gmail.com")){
        alert("Please enter a valid email");
        return;
      }
      this.state.onRegister(e, firstName, lastName, username, password, email);
    };  

    backHome = () => {
      window.location.reload();
    }

    render() {
        return (
        <div className="row justify-content-center">
          <h1 className='mb-5 mt-4'>Login</h1>
            <div className="col-4">
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")} id="tab-login"
                  onClick={() => this.setState({active: "login"})}>Login</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")} id="tab-register"
                  onClick={() => this.setState({active: "register"})}>Register</button>
              </li>
            </ul> 

            <div className="tab-content">
              <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")} id="pills-login" >
                <form onSubmit={this.onSubmitLogin}>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input type="login" id="username" name= "username" className="form-control" onChange={this.onChangeHandler}/>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                  </div>

                  <button type="submit" className="btn btn-success btn-block mb-2">Sign in</button>

                </form>
              </div>
              <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")} id="pills-register" >
                <form onSubmit={this.onSubmitRegister}>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="firstName">First name</label>
                    <input type="text" id="firstName" name="firstName" className="form-control" onChange={this.onChangeHandler}/>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="lastName">Last name</label>
                    <input type="text" id="lastName" name="lastName" className="form-control" onChange={this.onChangeHandler}/>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" className="form-control" onChange={this.onChangeHandler}/>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" className="form-control" onChange={this.onChangeHandler}/>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="registerPassword">Password</label>
                    <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                  </div>

                  <button type="submit" className="btn btn-success btn-block mb-2">Sign in</button>
                </form>
              </div>
            </div>
            <button type="submit" className="btn btn-danger btn-block mb-1" onClick={this.backHome}>Back</button>
            </div>
        </div>
        );
    };

}