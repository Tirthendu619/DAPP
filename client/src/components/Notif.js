import React, {useContext} from 'react';
import Context from '../store/Context';

const style = {
  color: 'white',
  padding: '10px',
  fontSize: '1.2em',
  fontWeight: 'bold',
  borderRadius: '4px',
  marginBottom: '20px'
}

const Notif = () => {
  const {state} = useContext(Context);
  return (
    <div className='u-full-width'
      style={{
        ...style,
        background: state.success ? 'green' : 'red'
      }}>
      {state.success ? 'Path : ' : 'Error : '}
      {state.msg}
    </div>
  )
}

export default Notif;
