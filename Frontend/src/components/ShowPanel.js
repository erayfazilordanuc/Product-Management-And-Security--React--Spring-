import React from 'react';

function ShowPanel(props) {

  const close = () => {
    props.onClose();
  };

  return (
    <div>
      {props.dataToShow && (
        <div className="mb-4 mt-3 border p-2" style={{cursor: 'default'}}>
          <p>Name : {props.dataToShow.name}</p>
          <p>Description : {props.dataToShow.description}</p>
          <p>Color : {props.dataToShow.color}</p>
          <p>Information : {props.dataToShow.information}</p>
          <p>Price : {props.dataToShow.price} $</p>
          <p>Brand : {props.dataToShow.brand}</p>
          <p>Dealer Id : {props.dataToShow.ownerId}</p> {/*Buraya satıcının idsi yerine ismi gelecek*/}
          <button className='btn btn-secondary' style={{marginRight: '5px'}} onClick={close}>Close</button>
        </div>
      )}
    </div>
  );
} 

export default ShowPanel;
