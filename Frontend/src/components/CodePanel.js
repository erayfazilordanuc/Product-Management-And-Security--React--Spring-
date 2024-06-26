import React, { useState, useEffect } from 'react';

function CodePanel(props) {

    const [code, setCode] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const submit = () => {
        props.submit(code);
    }

    const submitEnter = (event) => {
        if(event.key === 'Enter'){
            props.submit(code);
        }
    }

    const handleInputChange = (event) => {
        setCode(event.target.value);
    }
    
    return (
        <form className="d-flex flex-column align-items-center mt-3 mb-1">
            <p>Please enter the code sent to your email</p>
            <input type="text" className="form-control" style={{width: "100px"}} value={code} onChange={handleInputChange} />
            <button type="submit" className="btn btn-success mt-2" onKeyDown={submitEnter} onClick={submit}>Enter</button>
        </form>
    );
}

export default CodePanel;

