import React, {useState} from 'react';
import LineChart from './LineChart';

const sendFile = (setData) => {
  const file = document.getElementById('file').files[0]
  const url = 'http://localhost:3002/report';
  console.warn('yeet file', file);
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: file,
    headers: {
      'Content-Type': 'text/csv'
    }
  })
    .then(resp => resp.json())
    .then(resp => setData(resp))
}

const App = () => {
  const [data, setData] = useState();
  return (
    <div className="App">
      <LineChart width='1000' height='500' data={data}/>
      <input id='file' type='file'></input>
      <button onClick={() => sendFile(setData)}>Send</button>
    </div>
  );
}

export default App;
