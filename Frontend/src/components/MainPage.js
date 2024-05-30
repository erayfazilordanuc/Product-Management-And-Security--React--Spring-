import React from 'react';
import { request, setAuthHeader, getAuthToken} from '../services/axios';
import EditPanel from './EditPanel';
import ShowPanel from './ShowPanel';
import AddProductPanel from './AddProductPanel';
import jwt from 'jsonwebtoken';
import axios from 'axios';

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
      showAllProducts: true,
      editingProductId: null,
      showingProductId: null,
      addingProduct: false,
      isLoading: true,
      imageUrls: {},
      myProducts: false,
      accountInfoPanel: false,
      sortOrder: 'default',
      mySortOrder: 'default',
      allDefaultData: null,
      myDefaultData: null,
      userInfo: {}
    };
    this.productRefs = {};
  }

  componentDidMount() {
    this.fetchData();
    this.getAccountInfo();
  }

  async getAccountInfo() {

  }

  async fetchData() {
    try {
      const decoded = jwt.decode(getAuthToken());
      const response = await request('POST', '/user/getUserId', decoded.sub);
      const userId = response.data;
      this.setState({ passedUserId: userId });

      const getAccountInfo = await request('POST', '/user/getUserInfo', userId);
      this.setState({accountInfo: getAccountInfo.data});

      const productListResponse = await request('GET', '/products/listAll', {});
      const userProductsData = this.state.passedUserId
        ? productListResponse.data.filter(product => product.ownerId === this.state.passedUserId)
        : productListResponse.data.filter(product => product.ownerId === this.state.userId);

      productListResponse.data.forEach(product => {
        this.getImage(product.id);
      });

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

  getImage(productId) {
    this.state.imageUrls[productId] = "http://localhost:8080/products/getImage?id=" + productId; // gönderilen isteklerin adreslerini imageUrls'e kaydeder
  }

  edit = (product) => {
    if(this.state.editingProductId && this.state.editingProductId === product.id){
      this.setState({editingProductId: null});
    }else{
      if(this.state.showingProductId && this.state.showingProductId === product.id){
        this.setState({showingProductId: null});
      }
      this.setState({dataToEdit: product, editingProductId: product.id }, () => {
        const element = document.getElementById(`editProduct${product.id}`);
        if(element) {
          element.scrollIntoView({behavior: "smooth", block: "start"});
        }
      });
    }
  }

  show = (product, isOwned) => {
    if (isOwned === false) {
      if(this.state.allProdsShowing && this.state.allProdsShowing === product.id){
        this.setState({allProdsShowing: null});
      }else{
        this.setState({allProdsShowing: product.id, allProdsDataToShow: product}, () => {
          const element = document.getElementById(`showAllProduct${product.id}`);
          if(element){
            element.scrollIntoView({block: "start"});
          }
        });
      }
    } else {
      if (this.state.showingProductId && this.state.showingProductId === product.id) {
        this.setState({ showingProductId: null });
      } else {
        if (this.state.editingProductId && this.state.editingProductId === product.id) {
          this.setState({ editingProductId: null });
        }
        this.setState({ showingProductId: product.id, dataToShow: product }, () => {
          const element = document.getElementById(`showProduct${product.id}`);
          if (element) {
            element.scrollIntoView({block: "start"});
          }
        });
      }
    }
  }

  myProds = () => {
    this.setState((prevState) => ({
      myProducts: !prevState.myProducts // showAllProduct değerini öncekinin tersi yap
    }));
  }

  toggleAllProducts = () => {
    this.setState((prevState) => ({
      showAllProducts: !prevState.showAllProducts // showAllProduct değerini öncekinin tersi yap
    }), () => {
      if(this.state.showAllProducts){
        const element = document.getElementById('addButton');
          if (element) {
            element.scrollIntoView({block: "start"});
          }
      }
    });
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
    this.setState(prevState => ({ addingProduct: !prevState.addingProduct }), () => {
      if(this.state.addingProduct){
        const addButon = document.getElementById('addButton');
        addButon.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  }

  onDelete = (id) => {
    request('POST', '/products/delete', id)
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else {
          this.setState({ data: error.response.code });
        }
    });
  }

  onUploadImage = async (selectedFile, prodId) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('prodId', prodId);
    const response = await request("POST", "/products/uploadImage", formData);
  }

  logout = () => {
    if(window.confirm("Are you sure to logout?")){
      window.location.href="/";
      setAuthHeader(null);
    }
  };  

  onAddCancel = () => {
    this.setState({ addingProduct: false });
    window.scroll(0, 0);
  }

  onAllShowClose = (productId) => {
    this.setState({allProdsShowing: null}, () => {
      const element = document.getElementById(`allProdsRow${productId}`);
        if (element) {
          element.scrollIntoView({block: "center"});
        }
    });
  }

  onMyShowClose = (productId) => {
    this.setState({showingProductId: null}, () => {
      const element = document.getElementById(`myProdsRow${productId}`);
        if (element) {
          element.scrollIntoView({block: "center"});
        }
    });
  }

  onEditCancel = (productId) => {
    this.setState({ editingProductId: null }, () => {
      const element = document.getElementById(`myProdsRow${productId}`);
        if (element) {
          element.scrollIntoView({block: "center"});
        }
    })
  }

  sortChange = (event) => {
    this.setState({sortOrder: event.target.value}, this.sortProducts);
  }

  mySortChange = (event) => {
    this.setState({mySortOrder: event.target.value}, this.sortMyProducts);
  }

  sortProducts= () => {
    const {data, sortOrder} = this.state;
    let sortedData = [...data];

    if(!this.state.allDefaultData){
      this.setState({allDefaultData: data});
    }

    if(sortOrder === 'increasingCost') {
      sortedData.sort((a, b) => a.price - b.price);
    }else if(sortOrder === 'decreasingCost') {
      sortedData.sort((a, b) => b.price - a.price);
    }else if(sortOrder === 'default') {
      sortedData = this.state.allDefaultData;
    }

    this.setState({data: sortedData});
  }

  sortMyProducts= () => {
    const {userProductsData, mySortOrder} = this.state;
    let sortedData = [...userProductsData];

    if(!this.state.myDefaultData){
      this.setState({myDefaultData: userProductsData});
    }

    if(mySortOrder === 'increasingCost') {
      sortedData.sort((a, b) => a.price - b.price);
    }else if(mySortOrder === 'decreasingCost') {
      sortedData.sort((a, b) => b.price - a.price);
    }else if(mySortOrder === 'default') {
      sortedData = this.state.myDefaultData;
    }

    this.setState({userProductsData: sortedData});
  }

  accountInfo = () => {
    this.setState(prevState => ({ accountInfoPanel: !prevState.accountInfoPanel }), () => {
      if(this.state.accountInfoPanel){
        window.scroll(0, 0);
      }
    });
  }

  search = (event) => {
    const searchInput = document.getElementById('searchInput');
    if(event.key === 'Enter'){
      console.log(searchInput.value);
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div className='mt-5'>Loading...</div>;
    }

    return (
      <div style={{marginLeft: '250px', marginRight:'250px'}}>
        <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h4 style={{marginLeft: '5px'}}>Product Store</h4>
          <div>
            <button className='btn btn-light mt-1 mb-1 mx-1' onClick={this.accountInfo}>Account Info</button>
            <button className='btn btn-danger mt-1 mb-1 mx-1' onClick={this.logout}>Logout</button>
          </div>
        </header>

        <main>
          {/* Account Info */}
          <span>ㅤㅤㅤㅤㅤㅤ</span>
          {this.state.accountInfoPanel && (
            <div>
              <div style={{marginTop: '45px'}}>
                <p>{this.state.accountInfo.id}</p>
                <p>{this.state.accountInfo.username}</p>
                <p>{this.state.accountInfo.firstName}</p>
                <p>{this.state.accountInfo.lastName}</p>
                <p>{this.state.accountInfo.email}</p>
              </div>
            </div>
          )}

          {/* My Products */}
          <div className="container mb-3" style={{marginTop: '38px'}}>
            <button className={`btn ${this.state.myProducts ? 'btn-secondary' : 'btn-info'} mb-3`} onClick={this.myProds}>
            {this.state.myProducts ? 'Hide My Products' : 'Show My Products'}
            </button>
            {this.state.myProducts && (
              <div>
                <h5 className="mb-3">My Products</h5>
                <div className='mb-3' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div className='mb-2'>
                      <input onKeyDown={this.search} id="searchInput" style={{width: "400px"}} className="form-control" placeholder="Type what you want and press Enter to search..."></input>
                  </div>
                  <div className='col-sm-2'>
                    <label>Sort by</label>
                      <select onChange={this.mySortChange}className='form-select mt-1'>
                          <option value='default'>Default</option>
                          <option value='increasingCost'>Increasing cost</option>
                          <option value='decreasingCost'>Decreasing cost</option>
                      </select>
                  </div>
                </div>
              {this.state.userProductsData.length > 0 ? (
                <table className='table table-light'>
                  <thead>
                    <tr>
                      <th>Brand</th>
                      <th>Name</th>
                      {/* <th>Description</th> */}
                      <th>Color</th>
                      <th>Information</th>
                      <th>Price</th>
                      {/* <th>Owner ID</th> */}
                      <th>Image</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userProductsData.map((product) => ( 
                      <React.Fragment key={product.id}>
                        <tr id={`myProdsRow${product.id}`} className={this.state.editingProductId === product.id ? 'table-dark' : ''}>
                          <td onClick={() => this.show(product, true)}>{product.brand}</td>
                          <td onClick={() => this.show(product, true)}>{product.name}</td>
                          {/* <td onClick={() => this.show(product, true)}>{product.description}</td> */}
                          <td onClick={() => this.show(product, true)}>{product.color}</td>
                          <td onClick={() => this.show(product, true)}>{product.information}</td>
                          <td onClick={() => this.show(product, true)}>{product.price} $</td>
                          <td>
                            <img style={{width: "150px", backgroundColor: "white"}} src={this.state.imageUrls[product.id]} alt="Product Image" onClick={() => this.show(product, true)}/>
                          </td>
                          {/* <td>{product.ownerId}</td> */}
                          <td>
                            <button className='btn btn-primary' style={{paddingTop: '2px', paddingBottom: '2px'}} onClick={() => this.edit(product)}>
                                Edit
                            </button>
                          </td>
                        </tr>
                        {this.state.showingProductId === product.id && (
                          <tr>
                            <td style={{backgroundColor: '#f6f6f6'}} id={`showProduct${this.state.showingProductId}`} colSpan="7">
                              <ShowPanel
                                dataToShow={this.state.dataToShow}
                                onClose={this.onMyShowClose}
                              />
                            </td>
                          </tr>
                        )}
                        {this.state.editingProductId === product.id && (
                          <tr>
                            <td style={{backgroundColor: '#f6f6f6'}} id={`editProduct${this.state.editingProductId}`} colSpan="7">
                              <EditPanel
                                onUploadImage={this.onUploadImage}
                                onDelete={this.onDelete}
                                onSave={this.onSave}
                                dataToEdit={this.state.dataToEdit}
                                productId={product.id}
                                onCancel={this.onEditCancel} // Edit ekranını kapatmak için fonksiyon
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
            )}
            <div>
              <button id='addButton' className='btn btn-success' onClick={this.onAdd}>
                Add Product
              </button>
              {this.state.addingProduct && (
                <div style={{backgroundColor: '#f6f6f6'}}>
                  <AddProductPanel
                    onUploadImage={this.onUploadImage}
                    userId={this.state.passedUserId ||this.state.userId}
                    onSave={this.onSave}
                    onCancel={this.onAddCancel}
                  />
                </div>
              )}
            </div>
          </div>

          {/* All Products */}
          <button
            className={`btn ${this.state.showAllProducts ? 'btn-secondary' : 'btn-primary'} mb-3`}
            onClick={this.toggleAllProducts}
          >
            {this.state.showAllProducts ? 'Hide All Products' : 'Show All Products'}
          </button>
          {this.state.showAllProducts && (
            <div>
            <h5 className="mb-3">All Products</h5>
              <div className='mb-3' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className='mb-2'>
                    <input onKeyDown={this.search} id="searchInput" style={{width: "400px"}} className="form-control" placeholder="Type what you want and press Enter to search..."></input>
                </div>
                <div className='col-sm-3'>
                  <label>Sort by</label>
                    <select onChange={this.sortChange}className='form-select mt-1'>
                        <option value='default'>Default</option>
                        <option value='increasingCost'>Increasing cost</option>
                        <option value='decreasingCost'>Decreasing cost</option>
                        <option value='aToZ'>Alphabetical</option>
                        <option value='zToA'>Reverse Alphabetical</option>
                    </select>
                </div>
              </div>
              {this.state.data.length > 0 ? (
                <table className='table table-light'>
                  <thead>
                    <tr>
                      <th>Brand</th>
                      <th>Name</th>
                      {/* <th>Description</th> */}
                      <th>Color</th>
                      <th>Information</th>
                      <th>Price</th>
                      <th>Image</th>
                      {/* <th>Owner ID</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((product) => (
                      <React.Fragment key={product.id}> {/* Ürün gösterme paneli hemen ürünün altında çıksın */}
                        <tr id={`allProdsRow${product.id}`} onClick={() => this.show(product, false)}>
                          <td>{product.brand}</td>
                          <td>{product.name}</td>
                          {/* <td>{product.description}</td> */}
                          <td>{product.color}</td>
                          <td>{product.information}</td>
                          <td>{product.price} $</td>
                          <td>
                            <img style={{width: "175px", backgroundColor: "white"}} src={this.state.imageUrls[product.id]} alt="Product Image"/>
                          </td>
                          {/* <td>{product.ownerId}</td> */}
                        </tr>
                        {this.state.allProdsShowing === product.id && (
                          <tr>
                            <td style={{backgroundColor: '#f6f6f6'}} id={`showAllProduct${this.state.allProdsShowing}`} colSpan="7">
                              <ShowPanel
                                dataToShow={this.state.allProdsDataToShow}
                                onClose={this.onAllShowClose}
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
        </main>
      </div>
    );
  }
}
