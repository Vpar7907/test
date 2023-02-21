import * as React from 'react';
import { ICellData } from '../models/interfaces';
import Cell from './Cell';
import { adress } from '../common';

interface IProps {
    rowData: any[] | []
    index: number;
    setCell(cellAdress: string, content: string): void
    replace(x: ICellData, y: ICellData): void
}

function Row({ rowData, index, setCell, replace }: IProps) {
    return (<><tr>{rowData.map((value, i) => <Cell key={i} {...{ value, setCell, replace }} cellAdress={adress[i] + (index + 1)} />)}</tr></>);
}

export default Row;