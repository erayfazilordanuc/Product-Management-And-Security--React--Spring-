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

  const [selectedFile, setSelectedFile] = useState(null);

  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    if (props.dataToEdit) {
      setEditData(props.dataToEdit);
      getImage(props.dataToEdit.id);
    }
    
  }, [props.dataToEdit]);

  const onSave = () => {
      props.onSave(editData);
      setTimeout(() => {
        props.onUploadImage(selectedFile, props.dataToEdit.id); // Son kaydedilen ürünün id'sine göre resimleri adlandırdığı için son ürün kaydedilene kadar beklemesi lazım
      }, 500);
      props.onCancel();
      setTimeout(() => {
        window.location.href="/main";
      }, 750);
  };

  const onCancel = () => {
    props.onCancel(props.dataToEdit.id);
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

  const getImage = (productId) => {
    setImageUrls(prevState => ({
      ...prevState,
      [productId]: "http://localhost:8080/products/getImage?id=" + productId
    }));
  }

  const onImageChange = (e) => {
    const image = e.target.files[0];
    if(image){
      setSelectedFile(image);
      const previewUrl = URL.createObjectURL(image);
      setImageUrls(prevState => ({
        ...prevState,
        [props.dataToEdit.id]: previewUrl
      }));
    }
  }

  return (
    <div style={{cursor: 'default'}}>
      {editData && (
        <div className="mb-4 border p-2" style={{marginLeft: '150px', marginRight:'150px', marginTop: "35px"}}>
          <h4 className="mb-3">Editing Product</h4>
          <label>Brand</label>
          <input
            className="form-control mb-3"
            type="text"
            name="brand"
            value={editData.brand}
            onChange={onChange}
          />
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
          <label>Image</label>
          <div>
            <img className="mt-3 mb-3" src={imageUrls[props.dataToEdit.id]} alt="Product" style={{width: "250px"}}/>
          </div>
          <input
            className="form-control mb-3"
            id="file"
            name="file"
            type="file"
            multiple
            encType="multipart/form-data"
            accept="image/*"
            onChange={onImageChange}
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

