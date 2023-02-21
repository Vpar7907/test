import React, { useState } from 'react';
import { ICellData } from '../models/interfaces'
import Row from './Row';
import { adress } from '../common'


interface IProps {
    data: ICellData[]
    setData(arg: ICellData[]): void
    setCell(cellAdress: string, content: string): void
    replace(x: ICellData, y: ICellData): void
}

function Table({ data, setCell, setData, replace }: IProps) {
    let row = 0
    let cols = 0


    function parseToTable(data: ICellData[]) {
        const rows: any = []
        let maxLength = 0
        data.forEach((cellData) => {
            const { name, value } = cellData
            const rowAddress = name.split(/[A-Z]/)[1]
            const colAddress = name.split(/[0-9]/)[0]
            const numberCol = adress.indexOf(colAddress)
            if (maxLength < numberCol + 1) {
                maxLength = numberCol + 1
            }
            if (!rows[+rowAddress - 1]) {
                rows[+rowAddress - 1] = Array(numberCol + 1)
                rows[+rowAddress - 1].splice(numberCol, 1, value)
            } else { rows[+rowAddress - 1][numberCol] = value }
        })
        const filled = [...rows]

        filled.map((array) => {
            if (!array) return [...Array(maxLength - 1)]
            if (array[maxLength - 1]) return [...array]
            array[maxLength - 1] = ''
            return [...array]
        })
        row = filled.length
        cols = maxLength
        return [...filled]

    }
    return (
        <>
            <div>
                <table>
                    {parseToTable(data).map((rowData: string[], index) => {
                        if (rowData === undefined) {
                            return <Row rowData={Array(cols).fill(undefined)} {...{ index, setCell, replace }} key={index} />
                        }
                        return <Row rowData={[...rowData]} {...{ index, setCell, replace }} key={index} />
                    })}
                </table>
                <button onClick={() => {
                    setData([...data, {
                        name: `${adress[cols - 1]}${row + 1}`, value: ''
                    }])
                }}>Add row</button>



            </div>
            <button onClick={() => {
                setData([...data, {
                    name: `${adress[cols]}${row}`, value: ''
                }])
            }}>Add column</button>
        </>
    );
}

export default Table;