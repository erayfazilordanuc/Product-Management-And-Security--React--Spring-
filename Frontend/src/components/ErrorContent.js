import * as React from 'react';

export default class ErrorContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        error: props.error,
        errorText: ""
    };
  };

  componentDidMount(){
    this.checkError(this.props.error);
    // this.checkError(this.state.error);
  }
  
  componentDidUpdate(prevProps){
    if (prevProps.error !== this.props.error) {
      this.checkError(this.props.error);
    }
  }

  checkError(error){
    if(error === 400){
      this.setState({ errorText: "Wrong password" });
    }
    else if(error === 404){
      this.setState({ errorText: "No such user found" });
    }
    else{
      this.setState({ errorText: "This username already exist or network error or server may be down" });
    }
  }

  render() {
    return (
        <div className="row justify-content-md-center">
            <div className="jumbotron jumbotron-fluid">
              <div className="container mt-5">
                {/* <h1 className="display-4">{this.state.error}</h1> */}
                <p className="lead" style={{ color: 'red' }}>{this.state.errorText}</p>
              </div>
            </div>
        </div>
    );
  };
}
