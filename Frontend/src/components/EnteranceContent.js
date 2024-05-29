import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { request, setAuthHeader, getAuthToken } from '../services/axios';

export default class EnteranceContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      imageUrls: {}
    };
  }

  componentDidMount() {
    request('GET', '/products/limitedListAll', {}) 
      .then((response) => {
        this.setState({ data: response.data });

        response.data.forEach(product => {
          this.getImage(product.id); // Alınan her ürünün id'sine bir istek yollar
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else {
          this.setState({ data: error.response.code });
        }
      }
    );
         
    if (getAuthToken()) {
      window.location.href='/main';
      // to pass data --> <Link to={{ pathname: '/main', state: { data: this.state.data }}}>Main</Link>
    }
  }

  getImage(productId) {
    this.state.imageUrls[productId] = "http://localhost:8080/products/getImage?id=" + productId; // gönderilen isteklerin adreslerini imageUrls'e kaydeder
  }

  render() {
    return (
      <div>
        <header>
          <h2>Product Store</h2>
          {/* <ButtonLogout logout={this.handleLogout} /> Include ButtonLogout component */}
        </header>

        <main style={{marginLeft: '400px', marginRight:'400px'}}>
          <div id="imageContainer"></div>
          <div className="container mt-1 mb-5">
            <h2 className='mb-4'>All Products</h2>
            <div>
              {this.state.data.length > 0 ? (
                <table className="table table-striped">
                  <tbody>
                    {this.state.data.map((product) => (
                      <tr key={product} style={{cursor: "default"}}>
                        <td>{product.brand} {product.name}</td>
                        <td>
                          <img style={{width: "175px", backgroundColor: "white"}} src={this.state.imageUrls[product.id]} alt="Product Image" /> {/*imageUrls dizininden adresleri alır ve oradan resimleri gösterir */}
                        </td>
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
          <h6>Product Store &copy; 2024</h6>
        </footer>
      </div>
    );
  }
}
