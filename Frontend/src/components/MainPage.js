import React, { useState, useEffect } from 'react';
import { request, setAuthHeader, getAuthToken} from '../services/axios';
import EditPanel from './EditPanel';
import ShowPanel from './ShowPanel';
import AddProductPanel from './AddProductPanel';
import ButtonLogout from './ButtonLogout';
import jwt from 'jsonwebtoken';

// import ButtonLogout from './ButtonLogout';
// İsimlendirmeler düzenlenebilir
// Karmaşıklıklar azaltılabilir

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToEdit:[],
      dataToShow:[],
      allProdsDataToShow: [],
      userId: this.props.userId,
      passedUserId: null,
      data: [],
      userProductsData: [],
      allProdsShowing: null,
      showAllProducts: false,
      editingProductId: null,
      showingProductId: null,
      addingProduct: false,
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const decoded = jwt.decode(getAuthToken());
      const response = await request('POST', '/auth/getUserId', decoded.sub);
      this.setState({ passedUserId: response.data });

      const productListResponse = await request('GET', '/products/listAll', {});
      const userProductsData = this.state.passedUserId
        ? productListResponse.data.filter(product => product.ownerId === this.state.passedUserId)
        : productListResponse.data.filter(product => product.ownerId === this.state.userId);

      this.setState({
        data: productListResponse.data,
        userProductsData,
        isLoading: false
      });
    } catch (error) {
      if (error.response.status === 401) {
        setAuthHeader(null);
      } else {
        this.setState({ data: error.response.code, isLoading: false });
      }
    }
  }

  edit = (product) => {
    if(this.state.editingProductId && this.state.editingProductId === product.id){
      this.setState({editingProductId: null});
    }else{
      if(this.state.showingProductId && this.state.showingProductId === product.id){
        this.setState({showingProductId: null});
      }
      this.setState({dataToEdit: product});
      this.setState({editingProductId: product.id });
    }
  }

  show = (product, isOwned) => {
    if(isOwned === false){
      if(this.state.allProdsShowing && this.state.allProdsShowing === product.id){
        this.setState({allProdsShowing: null});
      }else{
        this.setState({allProdsShowing: product.id})
        this.setState({allProdsDataToShow: product});
      }
    }else{
    if(this.state.showingProductId && this.state.showingProductId === product.id){
      this.setState({showingProductId: null});
    }else{
      if(this.state.editingProductId && this.state.editingProductId === product.id){
        this.setState({editingProductId: null});
      }
        this.setState({showingProductId: product.id });
        this.setState({dataToShow: product});
      }
    }
  }

  toggleAllProducts = () => {
    this.setState((prevState) => ({
      showAllProducts: !prevState.showAllProducts // showAllProduct değerini öncekinin tersi yap
    }));
  }

  onSave = (data) => {
    request('POST', '/products/save', data) // fetches the products from the backend
      .then((response) => {
        
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else {
          this.setState({ data: error.response.code });
        }
    });
  }

  onAdd = () => {
    this.setState(prevState => ({ addingProduct: !prevState.addingProduct }));
  }

  onDelete = (id) => {
    request('POST', '/products/delete', id) // fetches the products from the backend
      .then((response) => {
        
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else {
          this.setState({ data: error.response.code });
        }
    });
  }

  logout = () => {
    window.location.href="/";
    setAuthHeader(null);
  };  

  render() {

    if (this.state.isLoading) {
      return <div className='mt-5'>Loading...</div>;
    }

    return (
      <div style={{marginLeft: '150px', marginRight:'150px'}}>
        <header>
          <h2>Product Store</h2>
          {/* <ButtonLogout logout={this.handleLogout} /> Include ButtonLogout component */}
        </header>

        <main>
          <ButtonLogout logout={this.logout}/>
          <div className="container mt-1 mb-5">
          <h3 className="mt-1 mb-3">Your Products</h3>
            <div>
              {this.state.userProductsData.length > 0 ? (
                <table  className='table table-light'>
                  <thead>
                    <tr>
                      <th>Brand</th>
                      <th>Name</th>
                      {/* <th>Description</th> */}
                      <th>Color</th>
                      <th>Information</th>
                      <th>Price</th>
                      {/* <th>Owner ID</th> */}
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userProductsData.map((product) => ( 
                      <React.Fragment key={product.id}>
                        <tr className={this.state.editingProductId === product.id ? 'table-dark' : ''}>
                          <td onClick={() => this.show(product)}>{product.brand}</td>
                          <td onClick={() => this.show(product, true)}>{product.name}</td>
                          {/* <td onClick={() => this.show(product, true)}>{product.description}</td> */}
                          <td onClick={() => this.show(product, true)}>{product.color}</td>
                          <td onClick={() => this.show(product, true)}>{product.information}</td>
                          <td onClick={() => this.show(product, true)}>{product.price} $</td>
                          {/* <td>{product.ownerId}</td> */}
                          <td>
                            <button className='btn btn-primary' style={{paddingTop: '2px', paddingBottom: '2px'}} onClick={() => this.edit(product)}>
                                Edit
                            </button>
                          </td>
                        </tr>
                        {this.state.showingProductId === product.id && (
                          <tr>
                            <td colSpan="7">
                              <ShowPanel
                                dataToShow={this.state.dataToShow}
                                onClose={() => this.setState({ showingProductId: null })}
                              />
                            </td>
                          </tr>
                        )}
                        {this.state.editingProductId === product.id && (
                          <tr>
                            <td colSpan="7">
                              <EditPanel
                                onDelete={this.onDelete}
                                onSave={this.onSave}
                                dataToEdit={this.state.dataToEdit}
                                productId={product.id}
                                onCancel={() => this.setState({ editingProductId: null })} // Edit ekranını kapatmak için fonksiyon
                              />
                            </td>
                          </tr>                         
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>You haven't added a product yet</p>
              )}
            </div>
            <div>
              <button className='btn btn-success mb-3' onClick={this.onAdd}>
                Add Product
              </button>
              {this.state.addingProduct && (
                <AddProductPanel
                  userId={this.state.passedUserId ||this.state.userId}
                  onSave={this.onSave}
                  onCancel={() => this.setState({ addingProduct: false })}
                />
              )}
            </div>
            <button 
              className={`btn ${this.state.showAllProducts ? 'btn-secondary' : 'btn-primary'} mb-3`}
              onClick={this.toggleAllProducts}
            >
              {this.state.showAllProducts ? 'Hide All Products' : 'Show All Products'}
            </button>
            {this.state.showAllProducts && (
              <div>
                {this.state.data.length > 0 ? (
                  <table className='table table-light'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        {/* <th>Description</th> */}
                        <th>Color</th>
                        <th>Information</th>
                        <th>Price</th>
                        {/* <th>Owner ID</th> */}
                        <th>Brand</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((product) => (
                        <React.Fragment key={product.id}> {/* Ürün gösterme paneli hemen ürünün altında çıksın */}
                          <tr onClick={() => this.show(product, false)}>
                            <td>{product.name}</td>
                            {/* <td>{product.description}</td> */}
                            <td>{product.color}</td>
                            <td>{product.information}</td>
                            <td>{product.price} $</td>
                            {/* <td>{product.ownerId}</td> */}
                            <td>{product.brand}</td>
                          </tr>
                          {this.state.allProdsShowing === product.id && (
                            <tr>
                              <td colSpan="7">
                                <ShowPanel
                                  dataToShow={this.state.allProdsDataToShow}
                                  onClose={() => this.setState({ allProdsShowing: null })}
                                />
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No products available</p>
                )}
              </div>
            )}
          </div>
        </main>

        <footer>
          <h7>Product Store &copy; 2024</h7>
        </footer>
      </div>
    );
  }
}
