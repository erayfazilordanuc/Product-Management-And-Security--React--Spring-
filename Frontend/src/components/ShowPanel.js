import React, {useEffect, useState} from 'react';

function ShowPanel(props) {

  const [imageUrls, setImageUrls] = useState({});

  const close = () => {
    props.onClose();
  };

  useEffect(() => {
    if (props.dataToShow && props.dataToShow.id) {
      getImage(props.dataToShow.id);
    }
  }, [props.dataToShow]);
  
  const getImage = (productId) => {
    setImageUrls(prevState => ({
      ...prevState,
      [productId]: "http://localhost:8080/products/getImage?id=" + productId
    }));
  }

  return (
    <div>
      {props.dataToShow && (
        <div className="mb-4 mt-4 border p-2" style={{cursor: 'default'}}>
          <p>Brand : {props.dataToShow.brand}</p>
          <p>Name : {props.dataToShow.name}</p>
          <p>Description : {props.dataToShow.description}</p>
          <p>Color : {props.dataToShow.color}</p>
          <p>Information : {props.dataToShow.information}</p>
          <p>Price : {props.dataToShow.price} $</p>
          <p>Dealer Id : {props.dataToShow.ownerId}</p> {/*Buraya satıcının idsi yerine ismi gelecek*/}
          <div><img className="mt-3" src={imageUrls[props.dataToShow.id]} alt="Product" style={{width: "500px"}}/></div>
          <button className='btn btn-secondary mt-4' onClick={close}>Close</button>
        </div>
      )}
    </div>
  );
} 

export default ShowPanel;
