import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Table from './components/Table'
import { ICellData } from './models/interfaces';

function App() {
  const [data, setData] = useState<ICellData[]>([{ name: 'A1', value: '1' }, { name: 'A2', value: '2' }, { name: 'B5', value: 'B5' }, { name: 'G1', value: 'hjkh' }])

  useEffect(() => {
    if (ref.current) {
      ref.current.value = JSON.stringify(data.filter((el) => el.value !== ''))
    }
  }, [data])
  const ref = useRef<HTMLTextAreaElement>(null)

  const setCell = (cellAdress: string, content: string) => {
    const filtred = data.filter(({ name }) => name !== cellAdress)


    const newData = [...filtred, { name: cellAdress, value: content }]
    setData(newData)
  }

  const replace = (x: ICellData, y: ICellData) => {
    const filtred = data.filter(({ name }) => name !== x.name && name !== y.name)

    const newData = [...filtred, { name: x.name, value: y.value }, { name: y.name, value: x.value }]
    setData(newData)
  }


  return (

    <div className="App">
      <div className='TableContainer'>
        <Table {...{ data, setData, setCell, replace }} />
      </div>
      <div className='text-field'>
        <textarea ref={ref} />
        <p> <button onClick={() => {
          ref.current?.value &&
            setData(JSON.parse(ref.current?.value))
        }}>Create table</button></p>
        <p><button onClick={() => {
          if (ref.current) ref.current.value = JSON.stringify(data.filter((element) => element.value !== ''))
        }}>Save</button></p>
      </div>
    </div>
  );
}

export default App;
