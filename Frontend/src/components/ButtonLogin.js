import * as React from 'react';

export default function Buttons(props) {
  return (
    <div className="row mt-4 mb-1">
      <div className="col-md-12 text-center" style={{ marginTop: '30px' }}>
        <button className="btn btn-primary" style={{ margin: '10px' }} onClick={props.login}>
          Login
        </button>
      </div>
    </div>
  );
};
