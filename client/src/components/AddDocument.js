import React, {useState, useContext} from 'react';
import Ipfs from './Ipfs';
import NodeRSA from 'node-rsa';
import Context from '../store/Context';

const AddDocument = () => {
  const {state, dispatch} = useContext(Context);

  const [buffer, setBuffer] = useState();
  const [publicKey, setPublicKey] = useState();

  const handleFileChange = e => {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    }
  }

  const handleKeyChange = e => {
    setPublicKey(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      const key = new NodeRSA(publicKey);
      const encrypt = key.encrypt(buffer);
      for await (const result of Ipfs.add(encrypt)) {
        await state.contract.methods
          .set(result.path)
          .send({from: state.accounts[0]});
        dispatch({type: 'SET_PATH', payload: result.path});
        dispatch({
          type: 'SET_NOTIF',
          payload: {msg: result.path, success: true}
        });
      }
    } catch (error) {
      dispatch({
        type: 'SET_NOTIF',
        payload: {msg: error.message, success: false}
      });
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  }

  return (
    <>
    <h2>ADD</h2>
    <form onSubmit={handleSubmit}>
      <label>File</label>
      <input
        className='u-full-width'
        type='file'
        onChange={handleFileChange}
        required />
      <label>Public Key</label>
      <input
        className='u-full-width'
        type='text'
        onChange={handleKeyChange}
        required />
      <button
        className='u-full-width button-primary'
        type='submit'>
        submit
      </button>
    </form>
    </>
  )
}

export default AddDocument;
