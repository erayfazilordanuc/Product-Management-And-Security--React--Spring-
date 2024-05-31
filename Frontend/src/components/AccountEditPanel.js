import React, { useState, useEffect } from 'react';

function AccountEditPanel(props) {
  const [editData, setEditData] = useState({
    name: '',
    surname: '',
    username: '',
    email: ''
  });

  useEffect(() => {
    if (props.dataToEdit) {
        setEditData(props.dataToEdit);
    }
    
  }, [props.dataToEdit]);

  const onSave = () => {
      props.onSave(editData);
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
    setEditData((prevData) => ({
    ...prevData,
    [name]: value
    }));
  };

  return (
    <div style={{cursor: 'default'}}>
      {editData && (
        <div className="mb-4 border p-2" style={{marginLeft: '150px', marginRight:'150px'}}>
          <h4 className="mb-3">Editing Account</h4>
          <label>Name</label>
          <input
            className="form-control mb-3"
            type="text"
            name="name"
            value={editData.name}
            onChange={onChange}
          />
          <label>Surname</label>
          <input
            className="form-control mb-3"
            type="text"
            name="surname"
            value={editData.surname}
            onChange={onChange}
          />
          <label>Username</label>
          <input
            className="form-control mb-3"
            type="text"
            name="username"
            value={editData.username}
            onChange={onChange}
          />
          <label>Email</label>
          <input
            className="form-control mb-3"
            type="text"
            name="email"
            value={editData.email}
            onChange={onChange}
          />
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

export default AccountEditPanel;

