import React, {useState, useContext} from 'react';
import Ipfs from './Ipfs';
import concat from 'it-concat';
import NodeRSA from 'node-rsa';
import Context from '../store/Context';

const GetDocument = () => {
  const {dispatch} = useContext(Context);

  const [path, setPath] = useState();
  const [privateKey, setPrivateKey] = useState();

  const handlePathChange = e => {
    setPath(e.target.value);
  }

  const handleKeyChange = e => {
    setPrivateKey(e.target.value);
  }

  const handleSubmit = async e => {
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      e.preventDefault();
      const key = new NodeRSA(privateKey);
      const data = await concat(Ipfs.cat(path))
      const decrypt = key.decrypt(data);
      const file = decrypt;
      let blob = new Blob([new Uint8Array(
        file.buffer, file.byteOffset, file.length)]);
      let url = URL.createObjectURL(blob);
      window.open(url);
      dispatch({
         type: 'SET_NOTIF',
         payload: {msg: undefined, success: undefined}
      });
    } catch (error) {
      dispatch({
        type: 'SET_NOTIF',
        payload: {
          msg: error.message,
          success: false
        }
      });
    } finally {
      dispatch({type: 'SET_LOADING', payload: false})
    }
  }

  return (
    <>
    <h2>GET</h2>
    <form onSubmit={handleSubmit}>
      <label>Path</label>
      <input
        className='u-full-width'
        type='text'
        onChange={handlePathChange}
        required />
      <label>Private Key</label>
      <input
        className='u-full-width'
        type='text'
        onChange={handleKeyChange}
        required />
      <button
        className='u-full-width button-primary'
        type='submit'>
        get
      </button>
    </form>
    </>
  )
}

export default GetDocument;
