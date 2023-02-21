import React, { useEffect, useState } from 'react';
import { ICellData } from '../models/interfaces';

interface IProps {
    value: string | number | undefined
    cellAdress: string
    setCell(cellAdress: string, content: string): void
    replace(x: ICellData, y: ICellData): void
}

function Cell({ value, setCell, cellAdress, replace }: IProps) {
    const [isEdit, setIsEdit] = useState(false)
    const [cellData, setCellData] = useState(value || '')
    const [target, setTarget] = useState('')
    useEffect(() => {
        setCell(cellAdress, String(cellData))
    }, [isEdit])

    useEffect(() => {
        setCellData(value || '')
    }, [value])

    useEffect(() => {
        if (target) {
            const [adr, data] = target.split(',')


            replace({ name: cellAdress, value: String(cellData) }, { name: adr, value: data })
        }
    }, [target])

    const clickOutside = (): void => {

        setIsEdit(false)

        document.removeEventListener('click', clickOutside)
    }
    return (
        <td
            data-adr={cellAdress}
            onDoubleClick={() => {
                setIsEdit(true)
                document.addEventListener('click', clickOutside)

            }}>
            {isEdit ?
                <input autoFocus onClick={(e) => {
                    e.stopPropagation()
                }} value={cellData}
                    onChange={e => setCellData(e.target.value)} /> :
                <div

                    data-adr={cellAdress}
                    draggable={!isEdit && true}
                    onDragStart={(event: React.DragEvent<HTMLDivElement>) => {

                        event.dataTransfer.clearData()
                        event.dataTransfer.setData('text/plain', `${cellAdress},${String(cellData)}`)

                    }}
                    onDragOver={(event: React.DragEvent<HTMLDivElement>) => {

                        event.preventDefault()

                    }}
                    onDrop={(event: React.DragEvent<HTMLDivElement>) => {

                        let x = event.dataTransfer.getData('text')


                        setTarget(x)

                    }}

                    className='cell'>
                    {cellData}
                </div>}
        </td>
    );
}

export default Cell;