import * as React from 'react';

export default function ButtonLogout(props) {
  return (
    <div className="row mt-4">
      <div className="col-md-12 text-center" style={{ marginTop: '30px' }}>
        <button className="btn btn-danger" style={{ margin: '10px' }} onClick={props.logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
