import React, {useContext} from 'react';
import NodeRSA from 'node-rsa';
import Context from '../store/Context';

const GenerateKeyPair = () => {
  const {state, dispatch} = useContext(Context);

  const handleClick = () => {
    const key = new NodeRSA({b: 512});
    dispatch({type: 'SET_PUBLIC_KEY', payload: key.exportKey('public')});
    dispatch({type: 'SET_PRIVATE_KEY', payload: key.exportKey('private')});
    //const publi = new NodeRSA(key.exportKey('public'));
    //const encrypt = publi.encrypt('test')
    //const privat = new NodeRSA(key.exportKey('private'));
    //console.log(privat.decrypt(encrypt, 'utf8'));
  }

  return (
    <>
    <h2>Generate Keys</h2>
    <button
      className='u-full-width button-primary'
      onClick={handleClick}>
      Genarate Key Pair
    </button>
    {state.publicKey && <pre><code>{state.publicKey}</code></pre>}
    {state.privateKey && <pre><code>{state.privateKey}</code></pre>}
    </>
  )
}

export default GenerateKeyPair;
