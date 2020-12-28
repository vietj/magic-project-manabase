import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from "@material-ui/core/Tooltip";
import Paper from '@material-ui/core/Paper';
import { red, blueGrey, grey } from "@material-ui/core/colors";
import {TableSortLabel} from "@material-ui/core";
import {useCurrentHeight} from "../utils/width";

const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 13,
        color: theme.palette.grey,
    },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStylesMobile = makeStyles({
    table: {
        maxWidth: '100%',
        maxHeight: '80vh',
    },
    row: {
        maxHeight: '10px',
    },
});

const useStylesDesktop = (height) => makeStyles({
    table: {
        maxWidth: '70%',
        maxHeight: 0.61 * height -82,
    },
    row: {
        maxHeight: '10px',
    },
})();

const getRowBackgroundColor = (value) => {
    let backgroundColor = blueGrey[900];
    const val = parseInt(value);
    if (val < 60) {
        return { backgroundColor : red[800] };
    }
    [
        [60, blueGrey[300]],
        [70, blueGrey[400]],
        [75, blueGrey[500]],
        [80, blueGrey[600]],
        [85, blueGrey[700]],
        [90, blueGrey[800]],
        [95, blueGrey[900]],
    ].forEach(([threshold, color]) => {
        if (val >= threshold) {
            backgroundColor = color;
        }
    });
    return {
        backgroundColor
    };
};

const getHeaderBackgroundColor = (selected) => {
    // console.log(selected);
    return selected ?
        { backgroundColor: grey[900] } :
        { backgroundColor: '#000' };
};

const BigTooltip = withStyles((theme) => ({
    tooltip: {
        fontSize: 14,
    },
}))(Tooltip);

const HeaderTableCell = (props) => {
    return <TableCell
        align="center"
        style={getHeaderBackgroundColor(props.selected === props.id)}
        onClick={props.onClick(props.id)}
    >
        <BigTooltip title={props.tooltips} placement="top" arrow>
            <div align="center">
                <span>{props.label}</span>
                <TableSortLabel active={props.selected === props.id}/>
            </div>
        </BigTooltip>
    </TableCell>
}

export default function ResultTable(props) {
    let height = useCurrentHeight();
    const desktopClasses = useStylesDesktop(height);
    const mobileClasses = useStylesMobile();
    const sortFunctions = props.sort;
    const fields = ['p1', 'p2'];
    const [selectedField, setSelectedField] = React.useState(1);
    const sortFunction = sortFunctions[selectedField];
    const sortedRows = sortFunction(props.rows);
    const classes = props.isMobile
        ? mobileClasses
        : desktopClasses;
    const tooltips = [
        'Assuming you hit all your landdrops',
        'True probability',
    ];

    const selectFieldToSort = (field) => () => {
        setSelectedField(field);
    }

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table size="small" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Card</StyledTableCell>
                        <HeaderTableCell id={0} label={"P1"} onClick={selectFieldToSort} selected={selectedField} tooltips={tooltips[0]}/>
                        <HeaderTableCell id={1} label={"P2"} onClick={selectFieldToSort} selected={selectedField} tooltips={tooltips[1]}/>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.data}>
                    {sortedRows.map((row) => (
                        <StyledTableRow hover className={classes.row} key={row.key} style={getRowBackgroundColor(row[fields[selectedField]])}>
                            <TableCell className={classes.row} component="th" scope="row" align="left">
                                {capitalize(row.key)}
                            </TableCell>
                            <TableCell align="center">{`${row.p1.toFixed(2)}%`}</TableCell>
                            <TableCell align="center">{`${row.p2.toFixed(2)}%`}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
