import React, { useState} from 'react';

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

  const [previewUrl, setPreviewUrl] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const onSave = async () => {
    if (!dataToAdd.name || !dataToAdd.description || !dataToAdd.color || !dataToAdd.information || !dataToAdd.price || !dataToAdd.brand || !dataToAdd.ownerId) {
      alert('Please fill in all fields');
      return; // Eğer bir input boşsa işlemi sonlandır
    }
    props.onSave(dataToAdd);
    setTimeout(() => {
      props.onUploadImage(selectedFile, -1); // Son kaydedilen ürünün id'sine göre resimleri adlandırdığı için son ürün kaydedilene kadar beklemesi lazım
    }, 500);
    props.onCancel();
    setTimeout(() => {
      window.location.href="/main";
    }, 750);
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

  const onImageChange = (e) => {
    const image = e.target.files[0];
    if(image){
      setSelectedFile(image);
      setPreviewUrl(URL.createObjectURL(image));
    }
  }

  return (
    <div>
      {dataToAdd && (
        <div className="mb-4 mt-3 border p-2" style={{marginLeft: '150px', marginRight:'150px'}}>
          <h4 className="mb-3">New Product</h4>
          <label>Brand</label>
          <input
            className="form-control mb-3"
            type="text"
            name="brand"
            value={dataToAdd.brand}
            onChange={onChange}
          />
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
          <label>Image</label>
          <div>
            {previewUrl && (<img className="mt-3 mb-3" src={previewUrl} alt="Product" style={{width: "250px"}}/>)}
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
