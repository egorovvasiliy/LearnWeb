import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/rootreducer'
import { Table, TableBody, TableCell, TableHead, TableRow, withStyles, createStyles, Theme } from '@material-ui/core';
import * as style from "./style.scss"
import { typeChangeVisibleScheduleTab } from '../../types';
const styleTab = style as ClassTable;
const headColor = "#343a40";
const grayColor = "#ffffffb5";
const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: headColor,
            color: grayColor,
            borderRightColor: grayColor,
            borderRightStyle: "solid",
            borderWidth: "1px",
            padding: "25px",
            paddingBottom: "5px"
        },
        body: {
            fontSize: 14,
            borderRightColor: headColor,
            borderRightStyle: "solid",
            borderWidth: "1px",
            padding: "5px"
        },
    }),
)(TableCell);
const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);
//--------------------------------------------------------------------------
const TableSchedule = () => {
    const store = useSelector((store: RootState) => store.maps);
    const dispatch = useDispatch();
    return store.visibleScheduleTab ?
        <div id="scheduleTab" className={styleTab.TabPoints}>
            <div className={styleTab.CloseTab} onClick={() => { dispatch({ type: typeChangeVisibleScheduleTab,val: false}) }}></div>
            <div className={styleTab.TitleTab}>Таблица точек</div>
            <Table aria-label="customized table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">№</StyledTableCell >
                        <StyledTableCell align="center">Прибытие</StyledTableCell >
                        <StyledTableCell align="center">Отправление</StyledTableCell >
                        <StyledTableCell align="center">Рейс</StyledTableCell >
                    </TableRow>
                </TableHead>
                <TableBody>
                    {store.sheduleOnStation.map((row: ISheduleOnStation, i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell component="th" scope="row">{i + 1}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{row.arrival}</StyledTableCell>
                            <StyledTableCell align="right">{row.departure}</StyledTableCell>
                            <StyledTableCell align="right">{row.thread.title}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </div>:
        <div id="emptyScheduleTab"></div>
}
export { TableSchedule }