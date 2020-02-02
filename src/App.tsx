import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './App.css';
import 'prevent-pull-refresh';
import { useGesture } from 'react-use-gesture'

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #7F00FF 0%, #E100FF 100%)',
  color: '#ffffff',
});

const App = () => {

  const inputEl: any = useRef(null);
  const serverIp = window.location.href

  const sendRequest = (url: string, method: string, body: string) => {
    fetch(`${serverIp}${url}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: body
    })
  }

  const sendMove = (mx: any, my: any, velocity: any) => {
    velocity = velocity >= 1 ? velocity : 1;
    const body = JSON.stringify({
      x: (mx)*velocity,
      y: (my)*velocity,
    })
    sendRequest('move', 'POST', body)
  }

  const sendWheel = (wheelX: number, wheelY: number) => {
    const body = JSON.stringify({
      x: wheelX,
      y: wheelY,
    })
    sendRequest('scroll', 'POST', body)
  }

  const sendClick = (button: string, double: boolean) => {
    const body = JSON.stringify({
      button: button,
      double: double,
    })
    sendRequest('click', 'POST', body)
  }

  const sendKey = (e:any) => {
    console.log(e.target.value)
    const body = JSON.stringify({
      key: e.target.value
    })
    sendRequest('type', 'POST', body)
  }

  const supportedKeys = ['Backspace', 'Enter']
  const sendDeleteKey = (e:any) => {
    if(!supportedKeys.includes(e.key)){
      return
    }
    const body = JSON.stringify({
      key: e.key
    })
    sendRequest('keytap', 'POST', body)
  }

  const bind = useGesture(
    {
      onDrag: ({ delta: [mx, my], velocity, down, touches }) => {
        if(!down){
          return
        }
        if(touches < 2){
          sendMove(mx, my, velocity);
        }else{
          sendWheel(mx+velocity*4, my+velocity*4)
        }
      }
    }
  )

  return (
    <div className="App">
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"></meta>
      <div {...bind()} className="Touch-Area">
      </div>
      <div className="App-Button">
        <input value='' onKeyDown={(e)=>sendDeleteKey(e)} onChange={(e)=>sendKey(e)} ref={inputEl} type="text" />
        <ButtonGroup variant="contained" aria-label="contained primary button group">
          <MyButton onClick={()=>sendClick('left', false)}>
          L🖱
          </MyButton >
          <MyButton onClick={()=>sendClick('right', false)}>
          R🖱
          </MyButton >
          <MyButton onClick={()=>inputEl.current.focus()}>
          ⌨
          </MyButton >
        </ButtonGroup>
      </div>
    </div>
  );
}

export default App;
