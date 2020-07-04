import React, {useReducer, useEffect} from 'react';
import Context from './store/Context';
import InitialeState from './store/InitialeState';
import Reducer from './store/Reducer';
import ipfs from './components/Ipfs';
import AddDocument from './components/AddDocument';
import GenerateKeyPair from './components/GenerateKeyPair';
import GetDocument from './components/GetDocument';
import Notif from './components/Notif';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import GetWeb3 from './utils/GetWeb3';

function App() {
  // use the reducer hook
  const [state, dispatch] = useReducer(Reducer, InitialeState);

  useEffect(() => {
    const init = async () => {
      // get web3 instance
      const web3 = await GetWeb3();
      
      // get accounts      
      const accounts = await web3.eth.getAccounts();

      // get the contract instance from the blockchain
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];      
      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      // set the web3 instance to a global variable
      dispatch({type: 'SET_WEB3', payload: web3});

      // set accounts to a global variable
      dispatch({type: 'SET_ACCOUNTS', payload: accounts});
      
      // set the contract instance to a global variable
      dispatch({type: 'SET_CONTRACT', payload: contract});
    }

    // launch the init function
    init();

    // if the account of metamask change, the accounts will be updated
    window.ethereum.on('accountsChanged', accounts => {
      dispatch({type: 'SET_CONTRACT', payload: accounts});
    });
  }, []);

  // the app will be started if the state is not null
  if(state && !state.loading) {
    return (
      // Provide state and dispatch function to the components of the app
      <Context.Provider value={{state, dispatch}}>
        <br/><br/>
        // call the notification component
        {state.msg && <Notif />}

        // call the add document component
        <AddDocument />
        <hr/>

        // call the get document component
        <GetDocument />
        <hr/>

        // call the generate key component
        <GenerateKeyPair/>
      </Context.Provider>
    );
  } else {
    // if the state in null, the app shows loading message
    return (
      <>
      <br/><br/>
      <h2>Loading...</h2>
      </>
    )
  }
}

export default App;
