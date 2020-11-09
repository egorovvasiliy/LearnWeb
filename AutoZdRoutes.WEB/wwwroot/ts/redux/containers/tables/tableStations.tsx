import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/rootreducer'
import { Menu, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, withStyles, createStyles, Theme } from '@material-ui/core';
import { selectIdStation_ActCr, changeVisibleSheduleTab_ActCr, SetScheduleOnStation_ActCr, getScheduleOnStation_ActTh } from '../../actions/mapsActions';
import * as style from "./style.scss"
import { typeChangeVisibleStationsTab } from '../../types';
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
const TableStations = () => {
    const state = useSelector((store: RootState) => store.maps);
    const dispatch = useDispatch()
    const selectedTypeStation = state.typesStation.find(tst => tst.type_id == state.selectedTypeStationId);
    const filtered_stations = selectedTypeStation ?
        state.stations.filter(st => st.station_type == selectedTypeStation.type_name || selectedTypeStation.type_id==0) :
        state.stations;
    const [stateMenu, setMenuOptions] = useState({
        isOpen: false,
        left: 0,
        top: 0
    })
    const ClickRow = (e: React.MouseEvent, id: number) => {
        if (e.button == 0) {
            dispatch(selectIdStation_ActCr(id));
        }
        else if (state.selectedStationId == id) {
            setMenuOptions({
                isOpen: true,
                left: e.clientX,
                top: e.clientY
            });
        }
        return false;
    }
    const CloseMenu = () => {
        setMenuOptions({
            isOpen: false,
            left: 0,
            top: 0
        })
    }
    return state.visibleStationsTab
        ?
        <div className={styleTab.TabPoints}>
            <div className={styleTab.CloseTab} onClick={() => { dispatch({ type: typeChangeVisibleStationsTab,val:false }) }}></div>
            <div className={styleTab.TitleTab}>Расписание</div>
            <Table aria-label="customized table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>№</StyledTableCell >
                        <StyledTableCell>id</StyledTableCell >
                        <StyledTableCell align="right">latitude</StyledTableCell >
                        <StyledTableCell align="right">longitude</StyledTableCell >
                        <StyledTableCell align="right">point_type</StyledTableCell >
                        <StyledTableCell align="right">Описание</StyledTableCell >
                        <StyledTableCell align="right">тип транспорта</StyledTableCell >
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filtered_stations.map((row: IStations, i) => (
                        <StyledTableRow onMouseDown={e => { ClickRow(e, row.id) }}
                            style={{ backgroundColor: state.selectedStationId == row.id ? "yellow" : "" }} key={row.id}>
                            <StyledTableCell component="th" scope="row">{i + 1}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                            <StyledTableCell align="right">{row.latitude}</StyledTableCell>
                            <StyledTableCell align="right">{row.longitude}</StyledTableCell>
                            <StyledTableCell align="right">{row.station_type}</StyledTableCell>
                            <StyledTableCell align="right">{row.title}</StyledTableCell>
                            <StyledTableCell align="right">{row.transport_type}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Menu
                anchorReference="anchorPosition"
                anchorPosition={{ left: stateMenu.left, top: stateMenu.top }}
                keepMounted
                open={stateMenu.isOpen}
                onClose={CloseMenu}
            >
                <MenuItem onClick={() => {
                    dispatch(changeVisibleSheduleTab_ActCr(true));
                    CloseMenu();
                }}>Показать расписание</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(changeVisibleSheduleTab_ActCr(false));
                    CloseMenu()
                }}>Скрыть расписание</MenuItem>
            </Menu>
        </div>
        :
        <div id="emptyTab" />
}
export { TableStations }