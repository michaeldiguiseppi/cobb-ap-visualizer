import React, { useState } from 'react';
import LineChart from '../LineChart';
import ChartWithTooltip from '../ChartWithTooltip';

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
    .then(resp => {
      console.warn('yeet resp', resp);
      return resp;
    })
    .then(resp => setData(resp))
}

const margin = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

const HomePage = () => {
  const [data, setData] = useState(undefined);
	return (
		<>
			<LineChart width='1000' height='500' data={data}/>
      {/* <ChartWithTooltip margin={margin} width='1000' height='200' data={data} /> */}
			<input id='file' type='file'></input>
			<button onClick={() => sendFile(setData)}>Send</button>
		</>
	)
}

export default HomePage