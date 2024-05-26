import React, { useState, useEffect } from 'react';

function EditPanel(props) {
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    color: '',
    information: '',
    price: '',
    brand: ''
  });

  useEffect(() => {
    if (props.dataToEdit) {
      setEditData(props.dataToEdit);
    }
  }, [props.dataToEdit]);

  const onSave = () => {
      props.onSave(editData);
      alert("The products successfuly edited, please reload the page to see the changes.")
      props.onCancel();
      window.location.href="/main";
  };

  const onCancel = () => {
    props.onCancel();
  };

  const onDelete = () => {
    if(window.confirm("Are you sure to delete this product?")){
      props.onDelete(props.productId);
      props.onCancel();
      window.location.href="/main";
    }
  }

  const onChange = (e) => { // e değeri input etiketine özel olarak direk doldurulduğu için onChange şeklinde kullanılır
    const { name, value } = e.target;
    if(isNaN(value) && name === 'price'){ // virgülde de hata veriyor ama şimdilik sıkıntı değil
      alert("Please enter a number in price")
    }else{
      setEditData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  return (
    <div style={{cursor: 'default'}}>
      {editData && (
        <div className="mb-4 mt-3 border p-2" style={{marginLeft: '150px', marginRight:'150px'}}>
          <h4 className="mb-3">Editing Product</h4>
          <label>Name</label>
          <input
            className="form-control mb-3"
            type="text"
            name="name"
            value={editData.name}
            onChange={onChange}
          />
          <label>Description</label>
          <input
            className="form-control mb-3"
            type="text"
            name="description"
            value={editData.description}
            onChange={onChange}
          />
          <label>Color</label>
          <input
            className="form-control mb-3"
            type="text"
            name="color"
            value={editData.color}
            onChange={onChange}
          />
          <label>Information</label>
          <input
            className="form-control mb-3"
            type="text"
            name="information"
            value={editData.information}
            onChange={onChange}
          />
          <label>Price ($)</label>
          <input
            className="form-control mb-3"
            type="text"
            name="price"
            value={editData.price}
            onChange={onChange}
          />
          <label>Brand</label>
          <input
            className="form-control mb-3"
            type="text"
            name="brand"
            value={editData.brand}
            onChange={onChange}
          />
          <button
            className="btn btn-danger"
            style={{ marginRight: '5px' }}
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="btn btn-secondary"
            style={{ marginRight: '5px' }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default EditPanel;

