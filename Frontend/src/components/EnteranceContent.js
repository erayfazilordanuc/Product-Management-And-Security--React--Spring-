import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { request, setAuthHeader, getAuthToken } from '../services/axios';

export default class EnteranceContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    request('GET', '/products/limitedListAll', {}) 
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else {
          this.setState({ data: error.response.code });
        }
      });

    console.log(getAuthToken());
    if (getAuthToken()) {
      // Use Link to navigate instead of window.location.href
      // Adjust the path and any necessary props accordingly
      window.location.href='/main';
      // or if you need to pass data:
      // <Link to={{ pathname: '/main', state: { data: this.state.data }}}>Main</Link>
    }
  }

  render() {
    return (
      <div>
        <header>
          <h2>Product Store</h2>
          {/* <ButtonLogout logout={this.handleLogout} /> Include ButtonLogout component */}
        </header>

        <main style={{marginLeft: '250px', marginRight:'250px'}}>
          <div className="container mt-1 mb-5">
            <h2 className='mb-4'>All Products</h2>
            <div>
              {this.state.data.length > 0 ? (
                <table className="table table-striped">
                  <tbody>
                    {this.state.data.map((product) => (
                      <tr key={product} style={{cursor: "default"}}>
                        <td>{product.brand} {product.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No products available</p>
              )}
            </div>
          </div>
        </main>

        <footer>
          <h7>Product Store &copy; 2024</h7>
        </footer>
      </div>
    );
  }
}
