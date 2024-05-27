import React, { useState, useEffect } from 'react';

function AddProductPanel(props) {
  const [dataToAdd, setDataToAdd] = useState({
    name: '',
    description: '',
    color: '',
    information: '',
    price: '',
    brand: '',
    ownerId: props.userId
  });

  const onSave = () => {
    console.log(dataToAdd.ownerId);
    props.onSave(dataToAdd);
    props.onCancel();
    window.location.href="/main";
  };

  const onCancel = () => {
    props.onCancel();
  };

  const onChange = (e) => { // e değeri input etiketine özel olarak direk doldurulduğu için onChange şeklinde kullanılır
    const { name, value } = e.target;
    if(isNaN(value) && name === 'price'){ // virgülde de hata veriyor
      alert("Please enter a number in price")
    }else{
      setDataToAdd((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  return (
    <div>
      {dataToAdd && (
        <div className="mb-4 mt-3 border p-2" style={{marginLeft: '150px', marginRight:'150px'}}>
          <h4 className="mb-3">New Product</h4>
          <label>Name</label>
          <input
            className="form-control mb-3"
            type="text"
            name="name"
            value={dataToAdd.name}
            onChange={onChange}
          />
          <label>Description</label>
          <input
            className="form-control mb-3"
            type="text"
            name="description"
            value={dataToAdd.description}
            onChange={onChange}
          />
          <label>Color</label>
          <input
            className="form-control mb-3"
            type="text"
            name="color"
            value={dataToAdd.color}
            onChange={onChange}
          />
          <label>Information</label>
          <input
            className="form-control mb-3"
            type="text"
            name="information"
            value={dataToAdd.information}
            onChange={onChange}
          />
          <label>Price</label>
          <input
            className="form-control mb-3"
            type="text"
            name="price"
            value={dataToAdd.price}
            onChange={onChange}
          />
          <label>Brand</label>
          <input
            className="form-control mb-3"
            type="text"
            name="brand"
            value={dataToAdd.brand}
            onChange={onChange}
          />
          <button
            className="btn btn-secondary"
            style={{ marginRight: '5px' }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="btn btn-success" onClick={onSave}>
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default AddProductPanel;
