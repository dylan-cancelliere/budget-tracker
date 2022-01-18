import React, { useState } from "react";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

import "./App.css";

function App() {
    const [tableHeader, setTableHeader] = useState([
        "Transaction Date",
        "Post Date",
        "Description",
        "Amount",
        "Category",
    ]);
    const [tableBody, setTableBody] = useState([
        ["1/01/2022", "1/01/2022", "Add CSV Data", "0.00", "Misc"],
    ]);
    const [csvInput, setCsvInput] = useState("");

    const parseCSV: any = (data: String) => {
        const arr = data.trim().split("\n");
        let categories = arr[0].split(",");
        let entries = [];
        for (let i = 1; i < arr.length; i++) {
            entries.push(arr[i].split(","));
        }
        return [categories, entries];
    };

    const renderTableHeader: any = (data: any) => {
        let arr: any = [];
        data.forEach((category: string) => {
            arr.push(<TableCell align="right">{category}</TableCell>);
        });
        return arr;
    };

    const renderTableBody: any = (data: any) => {
        let arr: any = [];
        data.forEach((entry: any) => {
            let cells: any = [];
            entry.forEach((item: any) => {
                cells.push(<TableCell align="right">{item}</TableCell>);
            });
            arr.push(
                <TableRow
                    sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                    }}
                >
                    {cells}
                </TableRow>
            );
        });

        return arr;
    };

    const renderRow: any = (data: any) => {};

    return (
        <div className="App">
            <h1>Data Input</h1>
            <div className="wrapper">
                <div className="csvInput">
                    <TextField
                        onChange={(e) => {
                            setCsvInput(e.target.value);
                        }}
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        multiline
                        maxRows="25"
                        style={{ width: "75%" }}
                    />
                    <br />
                    <Button
                        variant="contained"
                        onClick={() => {
                            let temp = parseCSV(csvInput);
                            setTableBody(temp[1]);
                        }}
                    >
                        Submit
                    </Button>
                </div>
                <div className="csvOutput">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {tableHeader &&
                                        tableBody &&
                                        renderTableHeader(tableHeader)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableBody &&
                                    tableHeader &&
                                    renderTableBody(tableBody)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default App;
