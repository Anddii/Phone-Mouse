import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './App.css';

const App = () => {

  const inputEl: any = useRef(null)
  
  return (
    <div className="App">
      <div className="App-Button">
        <input ref={inputEl} type="text" />
        <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
          <Button onClick={()=>inputEl.current.focus()}>
          ⌨
          </Button >
          <Button>
          R🖱
          </Button >
          <Button>
          L🖱
          </Button >
        </ButtonGroup>
      </div>
    </div>
  );
}

export default App;
